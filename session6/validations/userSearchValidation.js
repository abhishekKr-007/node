const Joi = require("joi");
const { validGenders } = require("../config/config");

const userSearchSchema = Joi.object({
  gender: Joi.string().valid(...validGenders),
  age: Joi.number().min(0).max(100),
}).or("gender", "age");

module.exports = { userSearchSchema };
