import { DataTypes, Sequelize } from "sequelize";
import { Book } from ".";
import { AuthorStatic } from "../types";

export function AuthorFactory(sequelize: Sequelize): AuthorStatic {
  const Author: AuthorStatic = sequelize.define("authors", {
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

  Author.hasMany(Book);
  Book.belongsTo(Author, {
    foreignKey: { name: "authorId", field: "author_id", allowNull: false },
  });

  return Author;
}
