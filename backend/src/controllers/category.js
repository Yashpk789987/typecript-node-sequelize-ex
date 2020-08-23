import { models } from "../models";
import { formatErrors } from "../utils/formatErrors";

const { Category } = models;

const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ ok: true, category });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ ok: true, categories });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
    });
    res.json({ ok: true, category });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.body;
    await Category.update(req.body, { where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

export { create, getAll, getById, updateById, deleteById };
