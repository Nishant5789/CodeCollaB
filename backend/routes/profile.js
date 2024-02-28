const { getUserProfile } = require('../controllers/profileControllers');

const router = require('express').Router();

router.get("/getLoggedUser",  getUserProfile);

module.exports = router;