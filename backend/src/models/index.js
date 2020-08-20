import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

const sequelize = new Sequelize(
  process.env.database,
  process.env.dbusername,
  process.env.dbpassword,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    host: process.env.dbhost,
    define: {
      underscored: true,
    },
    logging: process.env.NODE_ENV === undefined ? console.log : false,
  }
);

let models = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    // const model = require(path.join(__dirname, file))(
    //   sequelize,
    //   Sequelize.DataTypes
    // );
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize
    );
    console.log(model);
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export { models };
