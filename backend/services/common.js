const passport = require("passport");

module.exports.sanitizeUser = (user) => {
  return { id: user.id };
};

module.exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

module.exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    console.log(req.cookies['jwt']);
    token = req.cookies['jwt'];
  }
  return token;
}


