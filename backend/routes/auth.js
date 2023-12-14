const passport = require('passport');
const { loginUser, checkUser, creatUser } = require('../controllers/authControllers');
const router = require('express').Router();


router.post("/signup",  creatUser);
router.post("/login",  passport.authenticate("local"), loginUser);
router.get("/check",  passport.authenticate("jwt"), checkUser); 

module.exports = router;