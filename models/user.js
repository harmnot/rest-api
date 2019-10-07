"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "you must fill username yes"
          }
        },
        unique: {
          args: true,
          msg: "email already exist"
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [7, 200],
            msg: `password must be more than 7 chars`
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "you must fill role"
          }
        }
      }
    },
    {}
  );

  User.beforeCreate((model, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.password, 10, (err, hashing) => {
        if (err) reject(err);
        model.password = hashing;
        resolve();
      });
    });
  });

  User.beforeUpdate((model, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.password, 10, (err, hashing) => {
        if (err) reject(err);
        model.password = hashing;
        resolve();
      });
    });
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
