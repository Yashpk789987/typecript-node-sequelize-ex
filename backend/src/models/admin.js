import bcrypt from "bcryptjs";
export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "ormadmin",
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
        afterValidate: async (ormadmin) => {
          ormadmin.password = await bcrypt.hash(ormadmin.password, 12);
        },
      },
    }
  );
  return Admin;
};
