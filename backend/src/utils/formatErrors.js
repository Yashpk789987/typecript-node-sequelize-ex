import _ from "lodash";
import { ValidationError } from "sequelize";

export const formatErrors = (e) => {
  if (e instanceof ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [e];
};
