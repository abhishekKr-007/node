const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
const AuthServiceInstance = new AuthService();
const UserServiceInstance = new UserService();

const postSignup = async (req, res) => {
  try {
    const newUser = await AuthServiceInstance.signup(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: `User with this email already exists.` });
    res.status(500).send({ message: `Failed to sign user up!` });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const reqUser = await UserServiceInstance.findByUsername(username);
    if (!reqUser)
      return res.status(404).send({
        message: `User with username: ${username} could not be found!`,
      });

    const isLoggedIn = await AuthServiceInstance.comparePassword(
      password,
      reqUser.password
    );
    if (!isLoggedIn) return res.status(401).send({ isLoggedIn });
    res
      .header(
        "remember-user-token",
        AuthServiceInstance.generateJwt({ userId: reqUser._id })
      )
      .send({
        isLoggedIn,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Failed to login :( Try again!` });
  }
};

module.exports = { postSignup, postLogin };
