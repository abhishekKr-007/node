const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = AuthServiceInstance.verifyJwt(token);
    const user = await UserServiceInstance.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(403).send({ message: "JWT expired" });
    if (error.name === "JsonWebTokenError")
      return res.status(403).send({ message: error.message });
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = authorize;
