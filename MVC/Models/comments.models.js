const format = require("pg-format");
const db = require("../../db/connection.js");




const fetchCommentsByArticleID = (id) => {
  const checkArticleExistsSql = "SELECT * FROM articles WHERE article_id = $1";
  const getCommentsSql = "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC";
  console.log("Received article_id:", id); 
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid article ID" });
  }

  return db
    .query(checkArticleExistsSql, [id])
    .then(({ rows }) => {

      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return db.query(getCommentsSql, [id]);
    })
    .then(({ rows }) => {
     
      return rows.length > 0 ? rows : [];
    });
};

module.exports = { fetchCommentsByArticleID};
