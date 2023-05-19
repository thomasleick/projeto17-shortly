import { findUserByIdWithUrls } from "../services/userService.js";

export const getUserInfo = async (req, res) => {
  const foundUser = await findUserByIdWithUrls(res.locals.user.id);
  return res.status(200).json(foundUser);
};
