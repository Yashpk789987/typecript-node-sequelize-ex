/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 */

/**
 * @param {DataTypes} DataTypes
 * @param {Sequelize} Sequelize
 * @returns
 */

export default (Sequelize, DataTypes) => {
  const Category = Sequelize.define("category", {
    englishName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "English Name is required",
        },
      },
    },
    hindiName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.SubCategory);
  };

  return Category;
};
