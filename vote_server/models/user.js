'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    code: DataTypes.INTEGER,
    address: DataTypes.STRING,
   
  }, {});
  user.associate = function(models) {
        user.belongsTo(models.const_details)
        user.belongsTo(models.candidate)
}
  return user;

}



