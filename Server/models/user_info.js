'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_info = sequelize.define('user_info', {
    username:{
      type:DataTypes.STRING,
      primaryKey:true,
      validate:{ len: [1,200] }
    },
    name: {type:DataTypes.STRING,
    allowNull:false,
    validate:{ len: [1,200] }},
    password:  {type:DataTypes.STRING,
    allowNull:false,
    validate:{ len: [1,200] }},
    phone:  {type:DataTypes.INTEGER,
    allowNull:false,
    unique:true}
  }, {});
  user_info.associate = function(models) {
    // associations can be defined here
  };
  return user_info;
};