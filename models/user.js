"use strict";
const { Model } = require("sequelize");
const { isBefore } = require("date-fns");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING(32),
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          isEmail: true,
        },
      },
      password: {
        field: "password_hash",
        allowNull: false,
        type: DataTypes.TEXT,
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          // isBefore: new Date().toISOString(),
          isValidDate(value){
            if(isBefore(new Date(), new Date(value))) {
              throw new Error('Error: check birthday')
            }
          }
        },
      },
      isMale: {
        field: "is_male",
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
