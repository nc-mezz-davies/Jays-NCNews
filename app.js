const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const { getTopics } = require("./MVC/Controllers/topics.controllers.js");
const {
  handleCustomErrors,
  handleServerErrors
} = require("./middleware/errorHandler.js");

const {
  getArticles,
  getArticlesByID,
  editArticle,
} = require("./MVC/Controllers/articles.controllers.js");
const {
  getCommentsByArticleID,
  postCommentOnArticleID,
  DeleteCommentByID
} = require("./MVC/Controllers/comments.controllers.js");
app.get("/api", (req, res) => {
  res.status(200).json({ endpoints: endpointsJson });
});

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByID); 

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

app.post("/api/articles/:article_id/comments", postCommentOnArticleID);

app.patch("/api/articles/:article_id", editArticle);

app.delete("/api/comments/:comment_id", DeleteCommentByID);

app.use(handleCustomErrors);
app.use(handleServerErrors);

// app.use((err, req, res, next) => {
//   const { status = 500, msg = "Internal Server Error" } = err;
// //more handlers
//   res.status(status).send({ msg });
//});




module.exports = { app, endpointsJson };
