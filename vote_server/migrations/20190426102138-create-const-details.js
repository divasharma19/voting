'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('const_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      constituency: {
        primaryKey:true,
        unique:true,
        type: Sequelize.STRING
      },
      code: {
        primaryKey:true,
        unique:true,
        type: Sequelize.INTEGER
      },
      phase_date: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('const_details');
  }
};