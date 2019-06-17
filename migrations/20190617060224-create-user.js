'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_type: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      monday_opening_door: {
        type: Sequelize.STRING
      },
      monday_closing_door: {
        type: Sequelize.STRING
      },
      monday_lunch_from: {
        type: Sequelize.STRING
      },
      monday_lunch_to: {
        type: Sequelize.STRING
      },
      tuesday_opening_door: {
        type: Sequelize.STRING
      },
      tuesday_closing_door: {
        type: Sequelize.STRING
      },
      tuesday_lunch_from: {
        type: Sequelize.STRING
      },
      tuesday_lunch_to: {
        type: Sequelize.STRING
      },
      wednesday_opening_door: {
        type: Sequelize.STRING
      },
      wednesday_closing_door: {
        type: Sequelize.STRING
      },
      wednesday_lunch_from: {
        type: Sequelize.STRING
      },
      wednesday_lunch_to: {
        type: Sequelize.STRING
      },
      thursday_opening_door: {
        type: Sequelize.STRING
      },
      thursday_closing_door: {
        type: Sequelize.STRING
      },
      thursday_lunch_from: {
        type: Sequelize.STRING
      },
      thursday_lunch_to: {
        type: Sequelize.STRING
      },
      friday_opening_door: {
        type: Sequelize.STRING
      },
      friday_closing_door: {
        type: Sequelize.STRING
      },
      friday_lunch_from: {
        type: Sequelize.STRING
      },
      friday_lunch_to: {
        type: Sequelize.STRING
      },
      saturday_opening_door: {
        type: Sequelize.STRING
      },
      saturday_closing_door: {
        type: Sequelize.STRING
      },
      saturday_lunch_from: {
        type: Sequelize.STRING
      },
      saturday_lunch_to: {
        type: Sequelize.STRING
      },
      sunday_opening_door: {
        type: Sequelize.STRING
      },
      sunday_closing_door: {
        type: Sequelize.STRING
      },
      sunday_lunch_from: {
        type: Sequelize.STRING
      },
      sunday_lunch_to: {
        type: Sequelize.STRING
      },
      interval: {
        type: Sequelize.STRING
      },
      monday_flag: {
        type: Sequelize.BOOLEAN
      },
      monday_schedule: {
        type: Sequelize.STRING
      },
      tuesday_flag: {
        type: Sequelize.BOOLEAN
      },
      tuesday_schedule: {
        type: Sequelize.STRING
      },
      wednesday_flag: {
        type: Sequelize.BOOLEAN
      },
      wednesday_schedule: {
        type: Sequelize.STRING
      },
      thursday_flag: {
        type: Sequelize.BOOLEAN
      },
      thursday_schedule: {
        type: Sequelize.STRING
      },
      friday_flag: {
        type: Sequelize.BOOLEAN
      },
      friday_schedule: {
        type: Sequelize.STRING
      },
      saturday_flag: {
        type: Sequelize.BOOLEAN
      },
      saturday_schedule: {
        type: Sequelize.STRING
      },
      sunday_flag: {
        type: Sequelize.BOOLEAN
      },
      sunday_schedule: {
        type: Sequelize.STRING
      },
      twenty_four: {
        type: Sequelize.BOOLEAN
      },
      home_service: {
        type: Sequelize.BOOLEAN
      },
      number_of_customers_per_schedule: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};