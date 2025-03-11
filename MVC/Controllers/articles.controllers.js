const {
  fetchArticles,
  fetchArticlesByID,
} = require("../Models/articles.models.js");

const getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

const getArticlesByID = (req, res, next) => {
  const article_id = req.params.articleid;

  fetchArticlesByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err); 
        });
};

module.exports = { getArticles, getArticlesByID };
