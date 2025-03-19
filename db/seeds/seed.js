const db = require("../connection");

const {
   convertTimestampToDate 
  } = require("../seeds/utils.js")

const format = require("pg-format");


const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query("DROP TABLE IF EXISTS comments CASCADE") //<< write your first query in here.
    .then(() => {
      return db.query("DROP TABLE IF EXISTS articles CASCADE");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users CASCADE");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics CASCADE");
    })
    .then(() => {
      return createTopics();
    })
    .then(() => {
      return insertTopicData(topicData);
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return insertUserData(userData);
    })
    
    .then(() => {
      return createArticles();
    })
    .then(() => {
      return createComments();
    })
    .then(() => {
      return insertArticleData(articleData);
    })
    .then((articles) => { 
      return insertCommentData(commentData, articles);
    });
    
    
};


function createTopics() {
  return db.query(`CREATE TABLE topics(
    slug VARCHAR PRIMARY KEY, 
    description VARCHAR , 
    img_url VARCHAR(1000)  
    );`);
}

function createUsers() {
  return db.query(`CREATE TABLE users(
    username VARCHAR UNIQUE PRIMARY KEY, 
    name VARCHAR , 
    avatar_url VARCHAR(1000)  
    )`);
}

function createArticles() {
  return db.query(`CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY, 
    title VARCHAR , 
    topic VARCHAR,
    author VARCHAR ,
    body TEXT ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT ,
    article_img_url VARCHAR(1000),
       FOREIGN KEY (topic) REFERENCES topics(slug) ON DELETE CASCADE,
       FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE

    )`);
   
}

function createComments() {
  return db.query(`CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY NOT NULL, 
    article_id INT, 
    body TEXT NOT NULL,
    votes INT DEFAULT 0, 
    author VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE
    
    )`,
   
  );
}

function insertTopicData(data) {
  const sql = format(
    `INSERT INTO topics 
    (slug, description, img_url) 
    VALUES 
    %L
    RETURNING * 
    `,
    data.map((item) => [item.slug, item.description, item.img_url])
  );
  return db.query(sql);
}

function insertUserData(data) {
  const sql = format(
    `INSERT INTO users 
    (username, name, avatar_url) 
    VALUES 
    %L
    RETURNING * 
    `,
    data.map((item) => [item.username, item.name, item.avatar_url])
  );
  return db.query(sql);
}

function insertArticleData(data) {
  const sql = format(
    `INSERT INTO articles 
    ( title, topic, author, body, created_at, votes, article_img_url) 
    VALUES 
    %L
    RETURNING * 
    `,
    data.map((item) => {
      const {created_at, ...otherProperties} = convertTimestampToDate(item);
      return [
      
      item.title,
      item.topic,
      item.author,
      item.body,
      created_at,
      item.votes,
      item.article_img_url,
      
    ];
  
})
  );
  return db.query(sql).then((result) => {
    //console.log("Inserted articles with IDs:", result.rows);
    return result.rows; 
  });;
}

function insertCommentData(data, articles) {
  const articleLookup = articles.reduce((lookup, article) => {
    lookup[article.title] = article.article_id;  
    return lookup;
  }, {});
  
  const sql = format(
    `INSERT INTO comments 
    ( body, article_id, author, votes, created_at) 
    VALUES 
    %L
    RETURNING * 
    `,
    data.map((item) => {
     

      const {created_at, ...otherProperties} = convertTimestampToDate(item);
      const article_id = articleLookup[item.article_title];      return [
      item.body,
      article_id,
      item.author,
      item.votes,
      created_at,
    ]
  })
  );
  return db.query(sql).then((result) => {
   // console.log("Inserted comments:", result.rows);
    return result.rows;
  });;
}

module.exports = seed;


