'use strict';
module.exports = (sequelize, DataTypes) => {
  const ballet = sequelize.define('ballet', {
    symbol:{ 
      type:DataTypes.STRING,
      primaryKey:true
    },
    code:{ 
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    count: DataTypes.INTEGER,
    state: DataTypes.STRING,
    constituency: DataTypes.STRING
  }, {});
  ballet.associate = function(models) {
    // associations can be defined here
  };
  return ballet;
};