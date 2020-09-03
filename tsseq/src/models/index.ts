// import { Sequelize, Model } from "sequelize";

// const sequelize = new Sequelize("aaa", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
//   define: {
//     underscored: true,
//   },
//   logging: process.env.NODE_ENV === undefined ? console.log : false,
// });

// interface models {
//   string: Model;
// }

// let models: models = {
//   Book: require("./Book").default(sequelize, Sequelize),
// };

// Object.keys(models).forEach((modelName) => {
//   if ("associate" in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export { models };

import * as sequelize from "sequelize";
import { BookFactory } from "./Book";
import { AuthorFactory } from "./Author";

export const db = new sequelize.Sequelize("aaa", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: { underscored: true },
});

// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const Book = BookFactory(db);
export const Author = AuthorFactory(db);
