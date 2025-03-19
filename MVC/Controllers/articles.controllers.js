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

  const editArticle = (article_id) = (req,res,next) =>{
    const article_id = req.params.article_id;

    fetchArticlesByID(article_id)
    .then((article) => {
      console.log(article, "<<article")
      updateArticleVotes(article)
    })
    .then((comments) => {
      console.log(comments, "<<article w updated votes?")

      res.status(201).json({ comments });
    })
    .catch(next);
    // Request body accepts:

    // an object in the form { inc_votes: newVote }.
    // newVote will indicate how much the votes property in the database should be updated by, e.g.
    // { inc_votes : 1 } would increment the current article's vote property by 1
    // { inc_votes : -100 } would decrement the current article's vote property by 100

    
  }

module.exports = { getArticles, getArticlesByID, editArticle };
