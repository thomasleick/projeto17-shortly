import pool from "../configs/dbConn.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const refreshTokenExpiresIn = 24 * 60 * 60 * 1000; // one day
const accessTokenExpiresIn = 10 * 1000; // 10 seconds

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateTokens = (user) => {
  const accessToken = sign(
    {
      UserInfo: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: accessTokenExpiresIn }
  );
  const refreshToken = sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: refreshTokenExpiresIn }
  );
  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, refreshToken) => {
  const user = await User.findById(userId).exec();
  user.refreshToken = refreshToken;
  return user.save();
};

const generateAccessToken = (userInfo) => {
  return sign({ UserInfo: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiresIn,
  });
};

const verifyRefreshToken = async (refreshToken) => {
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return false;
  }
  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (foundUser._id.toString() !== decoded.id) {
      return false;
    }
    const accessToken = generateAccessToken({
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser._id,
    });
    return { foundUser, accessToken };
  } catch (error) {
    return false;
  }
};

const deleteRefreshToken = async (refreshToken) => {
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return false;
  }

  foundUser.refreshToken = "";
  await foundUser.save();
  return true;
};
const generatePassword = async (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const findUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting user", err);
    throw err;
  } finally {
    client.release();
  }
};

export const createUser = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    const result = await client.query({
      text: "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      values: [name, email, hashedPassword],
    });

    return result;
  } catch (err) {
    console.error("Error inserting new user", err);
    throw err;
  } finally {
    client.release();
  }
};
