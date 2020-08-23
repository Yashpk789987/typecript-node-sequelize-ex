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
  const SubCategory = Sequelize.define("subCategory", {
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
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        notEmpty: {
          args: true,
          msg: "please upload logo",
        },
      },
    },
  });

  SubCategory.associate = (models) => {
    SubCategory.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        field: "category_id",
        allowNull: false,
      },
    });
  };

  return SubCategory;
};
