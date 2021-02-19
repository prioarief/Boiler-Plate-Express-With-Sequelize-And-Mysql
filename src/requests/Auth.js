const joi = require("joi");
const response = require("../helpers/Response");
const User = require("../models/User");
const {hashSync, genSaltSync, compareSync} = require('bcrypt')

module.exports = {
  register: async (req, res, next) => {
    const schema = joi.object({
      name: joi.string().required(),
      username: joi.string().required(),
      password: joi.string().required(),
      level_id: joi.number(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return response(res, false, "", error.message, 400);
    const UsernameCheck = await User.findOne({raw: true, where: {username: value.username}})
    if(UsernameCheck) return response(res, false, "", "Username already exist", 422);
    req.validated = {...value, password: hashSync(value.password, genSaltSync(1)), level_id: value.level_id || 2}
    next()
  },

  login: async (req, res, next) => {
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return response(res, false, "", error.message, 400);
    const UsernameCheck = await User.findOne({where: {username: value.username}})
    if(!UsernameCheck) return response(res, false, "", "Username is not registered", 404);
    req.validated = value
    next()
  },
  listUser: async (req, res, next) => {
    const schema = joi.object({
      level: joi.number().required(),
    });

    const { error, value } = schema.validate(req.query);
    if (error) return response(res, false, "", error.message, 400);
    req.validated = value
    next()
  },
};
