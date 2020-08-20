import jwt from "jsonwebtoken";

export const requiresAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    await jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.json({
      ok: false,
      errors: [{ path: "auth", msg: "Not Authenticated" }],
    });
  }
};
