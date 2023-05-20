import * as urlRepository from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

function generateRandomId(length) {
  return nanoid(length);
}

export const shortenUrl = async (userId, url) => {
  const shortUrl = generateRandomId(6);
  return urlRepository.createUrl(userId, url, shortUrl);
};

export const findUrlBy = async (param, id, allData) => {
  const columns = allData ? "*" : `id, "shortUrl", url`;
  const foundUrl = await urlRepository.findUrlBy(param, id, columns);
  
  if (param === "shortUrl") {
    await urlRepository.incrementVisitCount(foundUrl.id);
  }
  return foundUrl;
};

export const deleteShortenWithId = async (id) => {
  return urlRepository.deleteUrlById(id);
};
