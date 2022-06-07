const {
  Item,
  Manufacture,
  Transaction,
  Report,
  sequelize,
} = require("../models/index");
const { Op } = require("sequelize");

class Controller {
  static async allReport(req, res, next) {
    try {
      let UserId = req.user.id;
      //   let option = {
      //     start_datetime: {
      //       [Op.gte]: moment().subtract(7, 'days').toDate()
      //     }
      //   };
      let listTransaction = await Report.findAll({
        where: { UserId },
        include: [
          {
            model: Transaction,
            include: [
              {
                model: Item,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: Manufacture,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: listTransaction,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  Controller,
};
