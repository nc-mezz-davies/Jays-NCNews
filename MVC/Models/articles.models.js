const format = require("pg-format");
const db = require("../../db/connection.js");


const fetchArticles = () => {
  const sql = format(`SELECT 
    ARTICLES.article_id, 
    ARTICLES.title, 
    ARTICLES.topic, 
    ARTICLES.author, 
    ARTICLES.created_at, 
    ARTICLES.votes, 
    ARTICLES.article_img_url, 
    CAST(COUNT(COMMENTS.comment_id) AS INTEGER) comment_count 
    FROM ARTICLES LEFT JOIN COMMENTS 
    ON ARTICLES.article_id = COMMENTS.article_id 
    GROUP BY ARTICLES.article_id
    ORDER BY created_at DESC`);


  return db.query(sql).then(({ rows }) => {
    return rows;
  });
};

const fetchArticlesByID = (id) => {
  const sql = "SELECT * FROM articles WHERE article_id = $1";
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid article ID" });
  }

  return db
    .query(sql, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0]; 
    });
};

module.exports = { fetchArticles, fetchArticlesByID };
