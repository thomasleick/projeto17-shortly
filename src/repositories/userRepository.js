import pool from "../configs/dbConn.js";

export const findUserByIdWithUrls = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT
        u.id,
        u.name,
        SUM(ur."visitCount") AS "visitCount",
        json_agg(json_build_object(
          'id', ur.id,
          'shortUrl', ur."shortUrl",
          'url', ur.url,
          'visitCount', ur."visitCount"
        )) AS "shortenedUrls"
      FROM users u
      JOIN urls ur ON u.id = ur."userId"
      WHERE u.id = $1
      GROUP BY u.id, u.name;`,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error getting user", err);
    throw err;
  } finally {
    client.release();
  }
};
