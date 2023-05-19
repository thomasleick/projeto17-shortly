import { nanoid } from "nanoid";
import pool from "../configs/dbConn.js";

function generateRandomId(length) {
  return nanoid(length);
}

export const createUrl = async (userId, url) => {
  const shortUrl = generateRandomId(6);

  const client = await pool.connect();
  try {
    const result = await client.query({
      text: `INSERT INTO urls("shortUrl", url, "visitCount", "userId") VALUES($1, $2, $3, $4)`,
      values: [shortUrl, url, 0, userId],
    });
    return result;
  } catch (err) {
    console.error("Error inserting new URL", err);
    throw err;
  } finally {
    client.release();
  }
};

export const findUrlBy = async (param, id, allData) => {
  const client = await pool.connect();
  const columns = allData ? "*" : `id, "shortUrl", url`;
  try {
    const result = await client.query({
      text: `SELECT ${columns} FROM urls WHERE "${param}" = $1`,
      values: [id],
    });

    const url = result.rows[0];

    if (param === "shortUrl") {
      await incrementVisitCount(client, url.id);
    }

    return url;
  } catch (err) {
    console.error("Error selecting URL", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deleteUrlById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query({
      text: "DELETE FROM urls WHERE id = $1",
      values: [id],
    });
    return result;
  } catch (err) {
    console.error("Error deleting URL", err);
    throw err;
  } finally {
    client.release();
  }
};

async function incrementVisitCount(client, id) {
  try {
    await client.query({
      text: `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
      values: [id],
    });
  } catch (err) {
    console.error("Error incrementing visit count", err);
    throw err;
  }
}
