'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ballets', {
      
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      count: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      constituency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ballets');
  }
};