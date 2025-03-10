const db = require("../../db/connection.js");
//const topics = require("../../db/data/test-data/topics");
const {fetchTopics} = require("../Models/topics.models.js")

const getTopics = (req, res, next) => {
    fetchTopics()
      .then((topics) => {
        console.log(topics, "<-- inside Controller");
        res.status(200).send({ topics }); 
      })

      //how to use error handling middleware
    //   .catch((err) => {
    //     console.error(err, "<<--- error within topics.controller");
    //     next(err); 
    //   });
  };
  
  module.exports = { getTopics };