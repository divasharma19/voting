'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate = sequelize.define('candidate', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    code:{ 
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    symbol: {
      type:DataTypes.STRING,
      primaryKey:true
    }
  }, {});
  candidate.associate = function(models) {
    candidate.belongsTo(models.const_details)
    candidate.hasMany(models.user)
  };
  return candidate;
};

