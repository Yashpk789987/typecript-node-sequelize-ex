import fs from "fs";

import { models } from "../models";
import { formatErrors } from "../utils/formatErrors";

const { SubCategory } = models;

const create = async (req, res) => {
  try {
    const subCategory = await SubCategory.create({
      ...req.body,
      logo: req.file ? req.file.filename : "",
    });
    res.json({ ok: true, subCategory });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const getAll = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll();
    res.json({ ok: true, subCategories });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const getAllByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.findAll({
      where: { categoryId: categoryId },
    });
    res.json({ ok: true, subCategories });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findOne({
      where: { id },
      include: { model: models.Category, attributes: ["englishName", "logo"] },
    });
    res.json({ ok: true, subCategory });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const updateDataById = async (req, res) => {
  try {
    const { id } = req.body;
    await SubCategory.update(req.body, { where: { id } });
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const updateLogoById = async (req, res) => {
  try {
    const { id } = req.body;
    const { logo } = await SubCategory.findByPk(id);
    await SubCategory.update(
      {
        logo: req.file ? req.file.filename : "",
      },
      { where: { id } }
    );
    fs.unlinkSync(`public/images/sub-category/${logo}`);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { logo } = await SubCategory.findByPk(id);
    await SubCategory.destroy({ where: { id } });
    fs.unlinkSync(`public/images/sub-category/${logo}`);
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const setCategoryDemoTrue = async (req, res) => {
  const t = await models.sequelize.transaction();
  const Op = models.Sequelize.Op;
  try {
    let { ids } = req.body;

    ids = JSON.parse(ids);

    await SubCategory.update(
      { demo: true },
      { where: { id: { [Op.in]: ids } }, transaction: t }
    );

    await SubCategory.update(
      { demo: false },
      { where: { id: { [Op.notIn]: ids } }, transaction: t }
    );

    await t.commit();
    res.json({ ok: true });
  } catch (error) {
    await t.rollback();
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

export {
  create,
  getAll,
  getAllByCategoryId,
  getById,
  updateDataById,
  updateLogoById,
  deleteById,
  setCategoryDemoTrue,
};
