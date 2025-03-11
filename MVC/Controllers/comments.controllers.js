const {fetchCommentsByArticleID} = require("../Models/comments.models.js")

const getCommentsByArticleID = (req, res, next) => {
  const article_id = req.params.articleid; 

  return Promise.all([fetchCommentsByArticleID(article_id)])
      .then((comments) => {
        res.status(200).send({ comments }); 
      }).catch((err) => {
     
        next(err);
      });
  };

  
  
  module.exports = { getCommentsByArticleID};