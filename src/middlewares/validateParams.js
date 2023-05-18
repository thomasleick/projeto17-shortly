export const validateNanoIdAsParams = (req, res, next) => {
  const id = req.params.id;
  const nanoidRegex = /^[a-zA-Z0-9_-]{6}$/;

  if (!nanoidRegex.test(id)) {
    return res
      .status(400)
      .json({
        message: "Invalid ID, must be a valid nanoid with 6 characters",
      });
  }
  next();
};
export const validateIdAsParams = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid ID, must be a positive integer" });
  }
  next();
}