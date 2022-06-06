const { User } = require("../models/index");
const {
  comparePassword,
  hashingPassword,
} = require("../helpers/helper-password");
const { createToken } = require("../helpers/helper-jwt");
class Controller {
  static async registerUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const newUser = await User.create({
        username,
        password: hashingPassword(password),
      });
      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          username: newUser.username,
        },
        message: "User has been created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const loggedInUser = await User.findOne({
        where: { username: username },
      });
      if (!loggedInUser) {
        throw { name: "username/Password not valid" };
      }
      const comparingPassword = comparePassword(
        password,
        loggedInUser.password
      );
      if (!comparingPassword) {
        throw { name: "username/Password not valid" };
      }
      const payload = {
        id: loggedInUser.id,
      };
      const accessToken = createToken(payload);
      res.status(200).json({
        statusCode: 200,
        access_token: accessToken,
        username: loggedInUser.username,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  Controller,
};
