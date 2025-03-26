const {
  fetchArticles,
  fetchArticlesByID,
  updateArticleVotes,
} = require("../Models/articles.models.js");

const getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

const getArticlesByID = (req, res, next) => {
  const article_id = req.params.article_id;

  fetchArticlesByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const editArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const votes = req.body.inc_votes;

  
  updateArticleVotes(article_id, votes).then((article) => {

      res.status(201).send({ article });
     
    })
    .catch(next);

};

module.exports = { getArticles, getArticlesByID, editArticle };
