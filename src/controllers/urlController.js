import { shortenUrl } from "../services/urlService.js";
export const postShorten = async (req, res) => {
  try {
    console.log(res.locals.user )
    await shortenUrl(res.locals.user.id, req.body.url)



    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};
