const { Item, Manufacture, sequelize } = require("../models/index");

class Controller {
  static async createManufacture(req, res, next) {
    try {
      const { name } = req.body;
      const newManufacture = await Manufacture.create({
        name,
      });
      res.status(201).json({
        statusCode: 201,
        data: {
          id: newManufacture.id,
          name: newManufacture.name,
        },
        message: "Manufacture has been created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async allManufacture(req, res, next) {
    try {
      let listManufacture = await Manufacture.findAll({
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: listManufacture,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editManufacture(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const findManufacture = await Manufacture.findByPk(id);
      if (!findManufacture) {
        throw { name: "Error not Found" };
      }
      const updatedManufacture = await Manufacture.update(
        {
          name,
        },
        { where: { id: id }, returning: true }
      );

      res.status(200).json({
        statusCode: 200,
        message: `Manufacture ${id} updated from ${findManufacture.name} to ${updatedManufacture.name}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteManufacture(req, res, next) {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      const manufacture = await Manufacture.findByPk(id);
      if (!manufacture) {
        throw { name: "Error not Found" };
      }
      await Item.destroy({ where: { ManufactureId: id }, transaction: t });
      await Manufacture.destroy({
        where: {
          id,
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        statusCode: 200,
        message: `Manufacture ${manufacture.id} deleted successfully`,
        data: manufacture.id,
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
