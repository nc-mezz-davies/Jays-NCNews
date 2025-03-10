const db = require("../../db/connection.js");

const fetchArticles = () => {
  const sql = "SELECT * FROM articles";

  return db.query(sql).then(({ rows }) => {
    return rows;
  });
};

const fetchArticlesByID = (id) => {
  const sql = "SELECT * FROM articles WHERE article_id = $1";
  return db
    .query(sql, [id])
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      console.error("Error fetching article by ID:", err);
      throw err;
    });
};

module.exports = { fetchArticles, fetchArticlesByID };
