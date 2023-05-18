import { shortenUrl, findUrlById } from "../services/urlService.js";

export const postShorten = async (req, res) => {
  try {
    await shortenUrl(res.locals.user.id, req.body.url);
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUrl = async (req, res) => {
  try {
    const urlData = await findUrlById(req.params.id)
    if(!urlData) {
      return res.status(404).json({ message: "url not found"})
    }
    return res.status(200).json(urlData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
