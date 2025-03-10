//const db = require("./db/connection.js");
const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");
const {getTopics} = require("./MVC/Controllers/topics.controllers.js")

app.get("/api", (req, res)=>{
res.status(200).json({endpoints: endpointsJson});
})

app.get("/api/topics", getTopics)


//app.listen

module.exports = {app, endpointsJson};