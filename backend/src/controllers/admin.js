import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { models } from "../models";
import { formatErrors } from "../utils/formatErrors";
import { sendMail } from "../utils/mail";

const Admin = models.ormadmin;

const create = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.json({ ok: true, admin });
  } catch (error) {
    res.json({ ok: false, errors: formatErrors(error) });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      res.json({
        ok: false,
        error: { path: "admin", msg: "User Do Not Exist" },
      });
    }
    if (bcrypt.compareSync(password, admin.password)) {
      var token = await jwt.sign(admin.dataValues, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      res.json({ ok: true, token: token });
    } else {
      res.json({
        ok: false,
        error: { path: "password", msg: "Wrong Password" },
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      error: { path: "unknown", msg: "There Is Some Techincal Issue" },
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      res.json({
        ok: false,
        error: { path: "admin", msg: "User Do Not Exist" },
      });
    }
    const token = jwt.sign(admin.dataValues, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 10,
    });
    const url = `http://${req.get("host")}/admin/update-password/${token}/p`;
    await sendMail(admin.email, url);
    res.json({
      ok: true,
      msg: `Link Is Sent To ${admin.email} to reset password`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      error: { path: "unknown", msg: "There Is Some Techincal Issue" },
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.render("update-password", { token: token, message: "" });
  } catch (err) {
    res.end("<h1>Sorry..<br/>This Link Is Expired..</h1>");
  }
};

const resetPassword = async (req, res) => {
  try {
    let { password, confirm_password, token } = req.body;
    if (password === confirm_password) {
      try {
        let { email } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        await Admin.update({ password }, { where: { email } });
        res.redirect("https://yashpk789987.github.io/AAA_DASHBOARD/#/login");
      } catch (err) {
        res.end("<h1>Sorry..<br/>This Link Is Expired..</h1>");
      }
    } else {
      res.render("updatePassword", {
        message: "Password And Confirm Password Do Not Match",
        token: req.body.token,
      });
    }
  } catch (error) {}
};

const me = async (req, res) => {
  res.json({ name: "hello" });
};

export { create, login, forgetPassword, updatePassword, resetPassword, me };
