const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const {getTopics} = require("./MVC/Controllers/topics.controllers.js");
const { getArticles, getArticlesByID } = require("./MVC/Controllers/articles.controllers.js");

app.get("/api", (req, res)=>{
res.status(200).json({endpoints: endpointsJson});
})

app.get("/api/topics", getTopics)

app.get("/api/articles/:articleid", getArticlesByID)


module.exports = {app, endpointsJson};