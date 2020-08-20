import _ from "lodash";
import { ValidationError } from "sequelize";

export const formatError = (e) => {
  if (e instanceof ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "unknown", message: "something went wrong" }];
};
