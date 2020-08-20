import { formatYupError } from "../utils/formatYupErrors";

export const validate = (validationSchema) => {
  return async (req, res, next) => {
    try {
      await validationSchema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.json({ ok: false, errors: formatYupError(error) });
    }
  };
};
