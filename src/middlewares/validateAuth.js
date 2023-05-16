import userSchema from "../schemas/userSchema.js";
import loginSchema from "../schemas/loginSchema.js";

export const validateNewUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req?.body?.password !== req?.body?.confirmPassword) {
    return res.status(400).json({ message: "Passwords dont match" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
