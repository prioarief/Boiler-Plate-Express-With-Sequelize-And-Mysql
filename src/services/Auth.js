const UserModel = require("../models/User");

module.exports = {
  register: async (transaction, data) => {
    return await UserModel.create(
      {
        ...data,
      },
      { transaction }
    );
  },
  update: async (transaction, data) => {
    let id = data.id;
    delete data.id;
    return await UserModel.update(
      {
        ...data,
      },
      { where: { id: id } },
      { transaction }
    );
  },
  login: async (username) => {
    return await UserModel.findAll({raw: true, where : {username: username}});
  },
};
