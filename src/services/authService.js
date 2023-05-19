import pool from "../configs/dbConn.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

export const refreshTokenExpiresIn = 24 * 60 * 60 * 1000; // one day
export const accessTokenExpiresIn = 24 * 60 * 60 * 1000;//10 * 1000; // 10 seconds

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateTokens = (user) => {
  const accessToken = sign(
    {
      UserInfo: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: accessTokenExpiresIn }
  );
  const refreshToken = sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiresIn,
  });
  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (userId, refreshToken) => {
  const client = await pool.connect();
  try {
    const query = {
      text: `UPDATE users SET "refreshToken" = $1 WHERE id = $2`,
      values: [refreshToken, userId],
    };
    await client.query(query);
    return;
  } catch (err) {
    console.error("Error updating refresh token", err);
    throw err;
  } finally {
    client.release();
  }
};

const generateAccessToken = (userInfo) => {
  return sign({ UserInfo: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiresIn,
  });
};

export const verifyRefreshToken = async (refreshToken) => {
  const foundUser = await findUserByRefreshToken(refreshToken);
  if (!foundUser) {
    return false;
  }
  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (foundUser.id !== decoded.id) {
      return false;
    }
    const accessToken = generateAccessToken({
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
    });
    return { foundUser, accessToken };
  } catch (error) {
    return false;
  }
};

export const deleteRefreshToken = async (refreshToken) => {
  const foundUser = await findUserByRefreshToken(refreshToken);
  if (!foundUser) {
    return false;
  }
  const client = await pool.connect();
  try {
    const query = {
      text: `UPDATE users SET "refreshToken" = $1 WHERE id = $2`,
      values: ["", foundUser.id],
    };
    await client.query(query);
    return true;
  } catch (err) {
    console.error("Error updating refresh token", err);
    throw err;
  } finally {
    client.release();
  }
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

export const findUserByRefreshToken = async (refreshToken) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM users WHERE "refreshToken"=$1`,
      [refreshToken]
    );
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
