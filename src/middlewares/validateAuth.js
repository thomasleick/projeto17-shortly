import userSchema from "../schemas/userSchema.js";

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
