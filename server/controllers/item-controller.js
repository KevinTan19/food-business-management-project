const {
  Item,
  Manufacture,
  Transaction,
  sequelize,
} = require("../models/index");

class Controller {
  static async createItem(req, res, next) {
    try {
      const { name, ManufactureId } = req.body;
      const newItem = await Item.create({
        name,
        status: true,
        ManufactureId,
      });
      res.status(201).json({
        statusCode: 201,
        data: {
          id: newItem.id,
          name: newItem.name,
        },
        message: "Item has been created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async allItem(req, res, next) {
    try {
      let listItem = await Item.findAll({
        include: [Manufacture],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: listItem,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editItem(req, res, next) {
    try {
      const { id } = req.params;
      const { name, ManufactureId } = req.body;
      const findItem = await Item.findByPk(id);
      if (!findItem) {
        throw { name: "Error not Found" };
      }
      const updatedItem = await Item.update(
        {
          name,
          ManufactureId,
        },
        { where: { id: id }, returning: true }
      );

      res.status(200).json({
        statusCode: 200,
        message: `Item ${id} updated from ${findItem.name} to ${updatedItem.name} with ManufactureID ${updatedItem.ManufactureId}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editStatusItem(req, res, next) {
    try {
      const { id } = req.params;
      const status = req.body.status;
      const findItem = await Item.findByPk(id);
      if (!findItem) {
        throw { name: "Error not Found" };
      }
      const updatedItem = await Item.update(
        {
          status,
        },
        { where: { id: id }, returning: true }
      );
      res.status(200).json({
        statusCode: 200,
        message: `Item ${id} status has been updated from ${findItem.status} to ${updatedItem.status}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      const item = await Item.findByPk(id);
      if (!item) {
        throw { name: "Error not Found" };
      }
      await Transaction.destroy({ where: { ItemId: id }, transaction: t });
      await Item.destroy({
        where: {
          id,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        statusCode: 200,
        message: "Item deleted successfully",
        data: item.id,
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
