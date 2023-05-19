import * as urlRepository from "../repositories/urlRepository.js";

export const shortenUrl = async (userId, url) => {
  return urlRepository.createUrl(userId, url);
};

export const findUrlBy = async (param, id, allData) => {
  return urlRepository.findUrlBy(param, id, allData);
};

export const deleteShortenWithId = async (id) => {
  return urlRepository.deleteUrlById(id);
};
