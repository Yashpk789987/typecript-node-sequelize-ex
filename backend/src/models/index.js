import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

// const sequelize = new Sequelize(
//   process.env.database,
//   process.env.dbusername,
//   process.env.dbpassword,
//   {
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     host: process.env.dbhost,
//     define: {
//       underscored: true,
//     },
//     logging: process.env.NODE_ENV === undefined ? console.log : false,
//   }
// );

const sequelize = new Sequelize("aaa", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    underscored: true,
  },
  logging: process.env.NODE_ENV === undefined ? console.log : false,
});

let models = {
  Admin: require("./Admin").default(sequelize, Sequelize),
  Category: require("./Category").default(sequelize, Sequelize),
  SubCategory: require("./SubCategory").default(sequelize, Sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export { models };
