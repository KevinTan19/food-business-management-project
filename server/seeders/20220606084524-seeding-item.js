"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = [
      {
        name: "Crispy Spicy Chicken",
        status: "true",
        ManufactureId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coke",
        status: "true",
        ManufactureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Funtu",
        status: "true",
        ManufactureId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pepso",
        status: "true",
        ManufactureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pepso Blue",
        status: "true",
        ManufactureId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Double Cheese Burger",
        status: "true",
        ManufactureId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cheese Burger",
        status: "true",
        ManufactureId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chicken Burger",
        status: "true",
        ManufactureId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fish Burger",
        status: "true",
        ManufactureId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Items", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("items", null, {});
  },
};
