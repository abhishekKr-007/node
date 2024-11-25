const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await UserServiceInstance.findById(payload.userId);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = strategy;
