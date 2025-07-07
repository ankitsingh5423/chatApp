import * as yup from "yup";
export const schemaSignup = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string(),
});
export const schemaSignin = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
  password: yup.string().required(),
});
