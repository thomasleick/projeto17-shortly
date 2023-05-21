import * as userRepository from "../repositories/userRepository.js";

export const findUserByIdWithUrls = async (id) => {
  return userRepository.findUserByIdWithUrls(id);
};
