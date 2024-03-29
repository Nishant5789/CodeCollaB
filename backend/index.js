const express = require("express");
const dotenv = require("dotenv").config();
const socket = require("socket.io");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require("./config/dbConnection");


// authentication library
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


// define imports
const port = process.env.PORT || 5001;
const { sanitizeUser, isAuth, cookieExtractor } = require('./services/common');
const User = require("./models/User");

// import routes
const authRoute = require('./routes/auth');
const codeRunnerRoute = require('./routes/codeRunner');
const profileRoute = require('./routes/profile');

const ACTIONS = require("./services/ACTIONS");


const app = express();
//connecting to database
connectDb();

// jwt options 
var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

// midleware
app.use(express.json());
app.use(express.static("../fronted/build"));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));
app.use(passport.authenticate('session'));
app.use(cors());

app.get('/', (req, res) => {
    res.send("connected");
});
app.use('/auth', authRoute);
app.use('/codeRunner', codeRunnerRoute);
app.use('/profile',isAuth() ,profileRoute);

// handle login 
passport.use(new LocalStrategy(
    // { usernameField: 'UserName', passwordField: "Password" },
    async function (username, password, done) {
        try {
            console.log(username, password);
            const user = await User.findOne({ UserName:username });
            console.log(user);
            if (user == null) {
                // done(iserror, isautorised, error message)
                return done(null, false, { message: 'invalid credentials' });
            }
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                if (!crypto.timingSafeEqual(user.Password, hashedPassword)) {
                    return done(null, false, { message: 'invalid credentials' });
                }
                const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
                return done(null, { token }); // this line send to serliser 
            });
        } catch (error) {
            console.log(error);
            done(error)
            return res.status(400).json(error);
        }
    }
));

//handle all request
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
        if (err) {
            return done(err, false);
        }
    }
}));


// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        console.log("serialize", user);
        return cb(null, user);
    });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        console.log("deserialize", user);
        return cb(null, user);
    });
});

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port  ${process.env.SERVER_PORT}`);
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {

    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

