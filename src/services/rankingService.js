import pool from "../configs/dbConn.js";

export const buildRanking = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT
        users.id,
        users.name,
        COUNT(urls.id) AS "linksCount",
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM
        users
    LEFT JOIN
        urls ON users.id = urls."userId"
    GROUP BY
        users.id
    ORDER BY
        "visitCount" DESC
    LIMIT
        10;`
    );
    return result.rows;
  } catch (err) {
    console.error("Error building ranking", err);
    throw err;
  } finally {
    client.release();
  }
};
