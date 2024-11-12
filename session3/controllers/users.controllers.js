const usersJson = require("./users.json");
const { userSearchSchema } = require("../validations/userSearchValidation");

const getUsers = (req, res) => {
  if (req.headers.authorization !== process.env.PASSWORD)
    return res.sendStatus(401); // return res.status(401).send({ message: "You are not authorized" });
  res.send(usersJson.data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const reqUser = usersJson.data.find((user) => user.login.uuid === uuid);
  if (!reqUser)
    return res
      .status(404)
      .send({ message: `User with uuid: ${uuid} could not be found!` });
  res.send(reqUser);
};

const searchUsers = (req, res) => {
  const { gender, age } = req.query;

  const { error } = userSearchSchema.validate({ gender, age });
  if (error) return res.status(400).send({ message: error.details[0].message });

  // if (gender && !validGenders.includes(gender))
  //   return res
  //     .status(400)
  //     .send({ message: "Gender must be either male or female." });

  // if ((age && isNaN(age)) || age < 0 || age > 100)
  //   return res
  //     .status(400)
  //     .send({ message: "Age must be a number between 0 and 100" });

  if (gender && age)
    return res.send(
      usersJson.data.filter(
        (user) => user.gender === gender && user.dob.age === Number(age)
      )
    );
  else if (gender) {
    return res.send(usersJson.data.filter((user) => user.gender === gender));
  } else if (age) {
    return res.send(
      usersJson.data.filter((user) => user.dob.age === Number(age))
    );
  } else
    return res
      .status(400)
      .send({ message: "One of `gender` or `age` is required." });
};

module.exports = { getUsers, getUserById, searchUsers };
