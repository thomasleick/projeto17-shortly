import urlSchema from "../schemas/urlSchema.js";

export const validateUrl = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
