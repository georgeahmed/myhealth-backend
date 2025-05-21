'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Here we insert some dummy users
    await queryInterface.bulkInsert('Users', [
      {
        email: 'doc1@example.com',
        hashed_password: 'somesupersecurehash',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'patient1@example.com',
        hashed_password: 'mysupersecurehash',
        role: 'patient',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin1@example.com',
        hashed_password: 'adminsecurehash',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // This reverts everything done in up()
    await queryInterface.bulkDelete('Users', null, {});
  }
};