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
        name: "KFC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CoceCole",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pepso",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Burger Queen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Manufactures", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Manufactures", null, {});
  },
};
