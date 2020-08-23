/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 */

/**
 * @param {DataTypes} DataTypes
 * @param {Sequelize} Sequelize
 * @returns
 */

import bcrypt from "bcryptjs";

export default (Sequelize, DataTypes) => {
  const Admin = Sequelize.define(
    "admin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already exists",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid Email",
          },
          notEmpty: {
            args: true,
            msg: "Email Is Required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterValidate: async (admin) => {
          admin.password = await bcrypt.hash(admin.password, 12);
        },
      },
    }
  );

  return Admin;
};
