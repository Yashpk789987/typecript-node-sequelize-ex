import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is required"),
});

export const forgetPasswordValidation = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
});
