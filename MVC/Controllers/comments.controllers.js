

const { fetchArticlesByID } = require("../Models/articles.models.js");
const {
  fetchCommentsByArticleID,
  insertComment,
  deleteComment,
  
} = require("../Models/comments.models.js");

const getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesByID(article_id)
    .then(() => {
      return fetchCommentsByArticleID(article_id);
    })
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch(next);
};

const postCommentOnArticleID = (req, res, next) => {

  const { body, author } = req.body;
  const { article_id } = req.params;

  insertComment(article_id, body, author)
    .then((newComment) => {
      res.status(201).json({ comment: newComment });
    })
    .catch((err) => {
      
      next(err);
    });

};

const DeleteCommentByID = (req, res, next) => {
 
  const { comment_id } = req.params;
  
  

  deleteComment(comment_id)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
      res.sendStatus(204); 
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticleID, postCommentOnArticleID, DeleteCommentByID };
