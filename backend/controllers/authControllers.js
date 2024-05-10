const crypto = require('crypto');
const { sanitizeUser } = require('../services/common');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.creatUser = async (req, res) => {
    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.Password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const user = new User({ ...req.body, Password: hashedPassword, salt });
            const docs = await user.save();
            console.log(sanitizeUser(docs));

            // which used to create a sesssion after register 
            // this also called serilize user and desialize user during try to create session 
            req.login(sanitizeUser(docs), (err) => {
                if (err) {
                    return res.status(400).json(err);
                }
                else {
                    const token = jwt.sign(sanitizeUser(docs), process.env.SECRET_KEY);
                    res.cookie("jwt", token, { expire: 360000 + Date.now(), httponly: true });
                    return res.status(200).json(token);
                }
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    return res.cookie("jwt", req.user.token, { expire: 360000 + Date.now(), httponly: true }).status(201).json(req.user.token);
}

module.exports.checkUser = async (req, res, next) => {
    try {
        // console.log("called");
        if (req.user) {
            return res.json({ status: "success", user: req.user });
        } else {
            return res.status(401);
        }
    } catch (error) {
        console.log(error);
    }
}


  

