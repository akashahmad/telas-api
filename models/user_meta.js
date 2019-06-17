'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_meta = sequelize.define('user_meta', {
    user_id: DataTypes.INTEGER,
    meta_key: DataTypes.STRING,
    meta_value: DataTypes.TEXT
  }, {});
  user_meta.associate = function(models) {
    // associations can be defined here
       user_meta.belongsTo(models.user, {foreignKey: 'user_id'});
  };
  return user_meta;
};