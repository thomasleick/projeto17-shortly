import joi from "joi";

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(2).required(),
  confirmPassword: joi.string().min(2).required(),
});

export default userSchema;
