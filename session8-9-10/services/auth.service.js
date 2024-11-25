const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthService {
  signup = async (payload) =>
    User.create({
      ...payload,
      password: await this.generatePasswordHash(payload.password),
    });

  generatePasswordHash = (password) => bcrypt.hash(password, 10);

  comparePassword = (plainTextPassword, hashedPassword) =>
    bcrypt.compare(plainTextPassword, hashedPassword);

  generateJwt = (payload) =>
    Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });

  verifyJwt = (token) => Jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = AuthService;
