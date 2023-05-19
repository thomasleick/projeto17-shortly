import { buildRanking } from "../services/rankingService.js";

export const getRanking = async (req, res) => {
  try {
    const ranking = await buildRanking();
    return res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
