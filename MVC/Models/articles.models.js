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
    GROUP BY ARTICLES.article_id, 
    ARTICLES.title, 
    ARTICLES.topic, 
    ARTICLES.author, 
    ARTICLES.created_at, 
    ARTICLES.votes, 
    ARTICLES.article_img_url 
    ORDER BY created_at DESC`);


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
