const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


require('dotenv').config();


app.get('/', (req, res) => {
    res.send("connected");
});
app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port  ${process.env.SERVER_PORT}`);
})
