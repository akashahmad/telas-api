'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    profile_type: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    opening_door: DataTypes.STRING,
    closing_door: DataTypes.STRING,
    interval: DataTypes.STRING,
    monday_flag: DataTypes.BOOLEAN,
    mondya_schedule: DataTypes.STRING,
    tuesday_flag: DataTypes.BOOLEAN,
    tuesday_schedule: DataTypes.STRING,
    wednesday_flag: DataTypes.BOOLEAN,
    wednesday_schedule: DataTypes.STRING,
    thursday_flag: DataTypes.BOOLEAN,
    thursday_schedule: DataTypes.STRING,
    friday_flag: DataTypes.BOOLEAN,
    friday_schedule: DataTypes.STRING,
    saturday_flag: DataTypes.BOOLEAN,
    saturday_schedule: DataTypes.STRING,
    sunday_flag: DataTypes.BOOLEAN,
    sunday_schedule: DataTypes.STRING,
    twenty_four: DataTypes.BOOLEAN,
    home_service: DataTypes.BOOLEAN,
    number_of_customers_per_schedule: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};