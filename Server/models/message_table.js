'use strict';
module.exports = (sequelize, DataTypes) => {
  const message_table = sequelize.define('message_table', {
    topic:DataTypes.STRING,
    from: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  message_table.associate = function(models) {
    // associations can be defined here
  };
  return message_table;
};