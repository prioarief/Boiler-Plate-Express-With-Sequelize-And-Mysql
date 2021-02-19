const AuthService = require("../services/Auth");
const db = require("../configs/database");
const response = require("../helpers/response");
const createToken = require("../helpers/generateToken");
const { compareSync } = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const transaction = await db.transaction();
    try {
      const inserted = await AuthService.register(transaction, req.validated);
      transaction.commit();
      return response(res, true, inserted, "", 200);
    } catch (error) {
      transaction.rollback();
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.validated;
      const get = await AuthService.login(username);
      const passwordMatch = compareSync(password, get[0].password);
      if (!passwordMatch)
        return response(res, false, "", "Password is wrong!", 400);

      get[0].token = createToken(get[0]);
      delete get[0].password
      return response(res, true, get, "", 200);
    } catch (error) {
      console.log(error);
    }
  },
};
