const {
  Item,
  Manufacture,
  Transaction,
  Report,
  sequelize,
} = require("../models/index");

class Controller {
  static async createTransaction(req, res, next) {
    try {
      const { tableNumber, ItemId } = req.body;
      const userId = req.user.id;
      const t = await sequelize.transaction();
      let d = new Date();
      let day = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      let hour = d.getHours();
      let second = d.getSeconds();
      // let payload = ItemId.map((id) => {
      //   return {
      //     transactionNumber: `ABC${day}${month}${year}${hour}${second}-001`,
      //     tableNumber,
      //     status: false,
      //     ItemId: id,
      //   };
      // });
      let payload = {
        transactionNumber: `ABC${day}${month}${year}${hour}${second}-001`,
        tableNumber,
        status: false,
        ItemId,
      }; //DEMO ONLY
      const newTransaction = await Transaction.bulkCreate(payload, {
        transaction: t,
      });
      let reportPayload = newTransaction.map((transaction) => {
        return {
          UserId: userId,
          TransactionId: transaction.id,
          transactionNumber: transaction.transactionNumber,
        };
      });
      await Report.bulkCreate(reportPayload, {
        transaction: t,
      });
      await t.commit();
      res.status(201).json({
        statusCode: 201,
        data: {
          transactionNumber: newTransaction.transactionNumber,
        },
        message: "Item has been created successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async allTransaction(req, res, next) {
    try {
      let listTransaction = await Transaction.findAll({
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

  static async editStatusTransaction(req, res, next) {
    try {
      const { id } = req.params;
      //   const status = req.body.status;
      const findTransaction = await Transaction.findByPk(id);
      if (!findTransaction) {
        throw { name: "Error not Found" };
      }
      const updatedTransaction = await Transaction.update(
        {
          status: true,
        },
        { where: { id: id }, returning: true }
      );
      res.status(200).json({
        statusCode: 200,
        message: `Transaction ${id} status has been updated from ${findTransaction.status} to ${updatedTransaction.status}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTransaction(req, res, next) {
    const { transactionNumber } = req.params;
    const t = await sequelize.transaction();
    try {
      const transaction = await Item.findAll({
        where: {
          transactionNumber,
        },
      });
      if (!transaction) {
        throw { name: "Error not Found" };
      }
      await Report.destroy({
        where: {
          transactionNumber,
        },
        transaction: t,
      });
      await Transaction.destroy({
        where: {
          transactionNumber,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        statusCode: 200,
        message: "Transaction deleted successfully",
      });
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }
}

module.exports = {
  Controller,
};
