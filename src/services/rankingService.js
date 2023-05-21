import * as rankingRepository from "../repositories/rankingRepository.js";

export const buildRanking = async () => {
  return rankingRepository.buildRanking();
};
