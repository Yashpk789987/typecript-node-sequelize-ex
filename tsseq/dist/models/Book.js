"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookFactory = void 0;
const sequelize_1 = require("sequelize");
function BookFactory(sequelize) {
    const Book = sequelize.define("books", {
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
    return Book;
}
exports.BookFactory = BookFactory;
//# sourceMappingURL=Book.js.map