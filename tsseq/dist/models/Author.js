"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorFactory = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
function AuthorFactory(sequelize) {
    const Author = sequelize.define("authors", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    Author.hasMany(_1.Book);
    _1.Book.belongsTo(Author, {
        foreignKey: { name: "authorId", field: "author_id", allowNull: false },
    });
    return Author;
}
exports.AuthorFactory = AuthorFactory;
//# sourceMappingURL=Author.js.map