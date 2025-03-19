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


function insertComment  (
  article_id,
  body,
  author
) {
 
  if (!article_id || !body || !author) {
    return Promise.reject({ status: 400, msg: "Missing required fields" });
  }
if (isNaN(article_id)){
  return Promise.reject({ status: 400, msg: "Invalid Article ID" });
}

     return db.query(
       "INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3)  RETURNING *",[article_id, body, author]
     ).then(({ rows }) => {
      return rows[0];
    });
   
};

module.exports = { fetchCommentsByArticleID, insertComment };
