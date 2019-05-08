'use strict';
module.exports = (sequelize, DataTypes) => {
  const const_details = sequelize.define('const_details', {
    state: DataTypes.STRING,
    constituency: DataTypes.STRING,
    code: DataTypes.INTEGER,
    phase_date: DataTypes.STRING
  }, {});
  const_details.associate = function(models) {
    const_details.hasMany(models.user),
    const_details.hasMany(models.candidate)
  };
  return const_details;
};