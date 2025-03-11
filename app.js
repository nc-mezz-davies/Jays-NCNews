const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const {getTopics} = require("./MVC/Controllers/topics.controllers.js");
const { getArticles, getArticlesByID } = require("./MVC/Controllers/articles.controllers.js");
const { getCommentsByArticleID } = require("./MVC/Controllers/comments.controllers.js");

app.get("/api", (req, res)=>{
res.status(200).json({endpoints: endpointsJson});
})

app.get("/api/topics", getTopics)

app.get("/api/articles/:articleid", getArticlesByID)


app.get("/api/articles", getArticles)

app.get("/api/articles/:articleid/comments", getCommentsByArticleID)


app.use((err, req, res, next) => {
    const { status = 500, msg = "Internal Server Error" } = err;
    res.status(status).send({ msg }); 
  });

module.exports = {app, endpointsJson};