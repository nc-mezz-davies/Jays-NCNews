const db = require("../../db/connection.js")


const fetchTopics = () => {
    const sql = "SELECT * FROM topics"; 
  
    return db.query(sql)
      .then(({ rows }) => {
       
        return rows; 
      })
  };

module.exports = {fetchTopics}