import { nanoid } from "nanoid";
import pool from "../configs/dbConn.js";

function generateRandomId(length) {
  return nanoid(length);
}

export const shortenUrl = async (userId, url) => {
  const shortUrl = generateRandomId(6);

  const client = await pool.connect();
  try {
    const result = await client.query({
      text: `INSERT INTO urls("shortUrl", url, "visitCount", "userId") VALUES($1, $2, $3, $4)`,
      values: [shortUrl, url, 0, userId],
    });
    return result;
  } catch (err) {
    console.error("Error inserting new user", err);
    throw err;
  } finally {
    client.release();
  }
};

export const findUrlBy = async (param, id) => {
  const client = await pool.connect();
  try {
    const result = await client.query({
      text: `SELECT id, "shortUrl", url FROM urls WHERE "${param}" = $1`,
      values: [id],
    });

    const url = result.rows[0];

    if (param === "shortUrl") {
      await client.query({
        text: `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
        values: [url.id],
      });
    }

    return url;
  } catch (err) {
    console.error("Error selecting URL", err);
    throw err;
  } finally {
    client.release();
  }
};
