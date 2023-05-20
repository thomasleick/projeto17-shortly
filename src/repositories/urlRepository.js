import pool from "../configs/dbConn.js";

export const createUrl = async (userId, url, shortUrl) => {
  const client = await pool.connect();
  try {
    const result = await client.query({
      text: `INSERT INTO urls("shortUrl", url, "visitCount", "userId") VALUES($1, $2, $3, $4)`,
      values: [shortUrl, url, 0, userId],
    });
    return result;
  } catch (err) {
    console.error("Error inserting new URL", err);
    throw new Error("Failed to create URL");
  } finally {
    client.release();
  }
};

export const findUrlBy = async (param, id, columns) => {
  const client = await pool.connect();
  try {
    const result = await client.query({
      text: `SELECT ${columns} FROM urls WHERE "${param}" = $1`,
      values: [id],
    });

    const url = result.rows[0];

    return url;
  } catch (err) {
    console.error("Error selecting URL", err);
    throw new Error("Failed to find URL");
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
    throw new Error("Failed to delete URL");
  } finally {
    client.release();
  }
};

export const incrementVisitCount = async (id) => {
  const client = await pool.connect();
  try {
    await client.query({
      text: `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
      values: [id],
    });
  } catch (err) {
    console.error("Error incrementing visit count", err);
    throw new Error("Failed to increment visit count");
  } finally {
    client.release();
  }
};
