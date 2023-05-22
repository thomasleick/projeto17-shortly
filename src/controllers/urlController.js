import {
  shortenUrl,
  findUrlBy,
  deleteShortenWithId,
} from "../services/urlService.js";

export const postShorten = async (req, res) => {
  try {
    const result = await shortenUrl(res.locals.user.id, req.body.url);
    return res.status(201).json({ id: result.id, shortUrl: result.shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUrl = async (req, res) => {
  try {
    const urlData = await findUrlBy("id", req.params.id);
    if (!urlData) {
      return res.status(404).json({ message: "url not found" });
    }
    return res.status(200).json(urlData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const redirectTo = async (req, res) => {
  try {
    const urlData = await findUrlBy("shortUrl", req.params.shortUrl);
    if (!urlData) {
      return res.status(404).json({ message: "url not found" });
    }
    //return res.redirect(urlData.url)
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteShorten = async (req, res) => {
  try {
    const urlData = await findUrlBy("id", req.params.id, true);
    if (!urlData) {
      return res.status(404).json({ message: "url not found" });
    }
    if (urlData.userId !== res.locals.user.id) {
      return res.sendStatus(401);
    }
    await deleteShortenWithId(req.params.id);
    return res.status(204).json({ message: "Url deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
