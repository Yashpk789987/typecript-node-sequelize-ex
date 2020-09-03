import { DataTypes, Sequelize } from "sequelize";
import { BookStatic } from "../types";

export function BookFactory(sequelize: Sequelize): BookStatic {
  const Book: BookStatic = sequelize.define("books", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Book;
}
