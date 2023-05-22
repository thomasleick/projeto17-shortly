import { verify } from "jsonwebtoken";
const ATK =
  "60a067500b4ead6d69626ca013593343dd8ed6d14aa43240dcfe1b827facbc010dfe59656a8c99dd0fb1160c47cae63e3abc3abf298727d5dbb5dd399c0ae7b1";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  verify(
    token,
    ATK,
    /* process.env.ACCESS_TOKEN_SECRET */ (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      res.locals.user = {
        id: decoded.UserInfo.id,
        email: decoded.UserInfo.email,
      };
      next();
    }
  );
};

export default verifyJWT;
