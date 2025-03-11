const format = require("pg-format");
const db = require("../../db/connection.js");




const fetchCommentsByArticleID = (id) => {
  const sql = "SELECT * FROM comments WHERE ARTICLE_ID = $1 ORDER BY created_at DESC";
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid article ID" });
  }
  return db
    .query(sql, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comments not found" });
      }
      return rows; 
    });
};

module.exports = { fetchCommentsByArticleID};
