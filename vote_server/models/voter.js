'use strict';
module.exports = (sequelize, DataTypes) => {
  const voter = sequelize.define('voter', {
    ids:{
      type:DataTypes.INTEGER,
      primaryKey:true
  }}, {});
  voter.associate = function(models) {
    // associations can be defined here
  };
  return voter;
};