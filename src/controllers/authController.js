import {
  findUserByEmail,
  createUser,
  comparePassword,
  generateTokens,
  saveRefreshToken,
  refreshTokenExpiresIn,
  deleteRefreshToken,
  verifyRefreshToken,
} from "../services/authService.js";

export const postUser = async (req, res) => {
  try {
    const foundUser = await findUserByEmail(req.body.email);
    if (foundUser) {
      return res
        .status(409)
        .json({ message: "User already registered with this Email" });
    }
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const handleLogin = async (req, res) => {
  try {
    const foundUser = await findUserByEmail(req.body.email);
    if (!foundUser) {
      return res.sendStatus(404); //unauthorized
    }
    const match = await comparePassword(req.body.password, foundUser.password);
    if (match) {
      const { accessToken, refreshToken } = generateTokens(foundUser);
      await saveRefreshToken(foundUser.id, refreshToken);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: refreshTokenExpiresIn,
      });

      return res.json({
        name: foundUser.name,
        email: foundUser.email,
        accessToken,
      });
    } else {
      return res.sendStatus(401); //unauthorized
    }
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);
  if (!cookies?.jwt) {
    return res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;
  const deleted = await deleteRefreshToken(refreshToken);

  if (!deleted) {
    res.clearCookie("jwt"), { httpOnly: true };
    return res.sendStatus(403); // Forbidden
  }

  res.clearCookie("jwt"), { httpOnly: true, sameSite: "None", secure: true };
  res.sendStatus(204);
};

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  
  const result = await verifyRefreshToken(refreshToken);

  if (!result) return res.sendStatus(403);
  const { foundUser, accessToken } = result;

  res.json({
    name: foundUser.name,
    email: foundUser.email,
    accessToken,
  });
};
