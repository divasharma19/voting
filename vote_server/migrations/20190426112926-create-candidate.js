'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidates', {
     
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.INTEGER,
        foreignkey:{
        name: 'fk_dets1',
        references: {
          table: 'const_details',
          field: 'code',
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      }},
      symbol: {
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
    }).then(()=>{
      return queryInterface.sequelize.query('ALTER TABLE "candidates" ADD CONSTRAINT "username" PRIMARY KEY ("code", "symbol")');
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidates');
  }
};