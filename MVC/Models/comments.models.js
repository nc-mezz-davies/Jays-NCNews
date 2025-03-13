const format = require("pg-format");
const db = require("../../db/connection.js");

const fetchCommentsByArticleID = (article_id) => {

  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const checkArticleExists = (article_id) => {

  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Invalid Article ID" });
  }

  return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
  });
};
function insertComment  (
  article_id,
  body,
  author
) {
  if (!article_id || !body || !author) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }
     return db.query(
       "INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3)  RETURNING *",[article_id, body, author]
     ).then(({ rows }) => {
      return rows;
    });
   
};

module.exports = { fetchCommentsByArticleID, insertComment, checkArticleExists };
