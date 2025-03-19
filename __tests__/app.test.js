const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const db = require("../db/connection");
const { app } = require("../app.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

let server;
require("jest-sorted");

beforeEach(async () => {
  if (server) {
    await server.close(); // Close any previous instance before starting a new one
  }
  server = app.listen(4000);
  await seed(testData);
});

afterAll(async () => {
  if (server) {
    await server.close();
  }
  await db.end(); // Close DB connection
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        res.body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:articleid", () => {
  test("200: Responds with articles of an article_id", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {
        expect(typeof res.body.article).toBe("object");
        expect(typeof res.body.article.article_id).toBe("number");
        expect(typeof res.body.article.title).toBe("string");
        expect(typeof res.body.article.topic).toBe("string");
        expect(typeof res.body.article.author).toBe("string");
        expect(typeof res.body.article.body).toBe("string");
        expect(typeof res.body.article.created_at).toBe("string");
        expect(typeof res.body.article.votes).toBe("number");
        expect(typeof res.body.article.article_img_url).toBe("string");
      });
  });
  test("404: article_id not found", () => {
    return request(app)
      .get("/api/articles/2000")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: "Article not found" });
      });
  });
  test("400: invalid article_id", () => {
    return request(app)
      .get("/api/articles/abc")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Invalid Article ID" });
      });
  });
});

describe("GET /api/articles/", () => {
  test("200: Responds with all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;

        expect(articles.length).toBe(13);

        for (let i = 0; i < articles.length - 1; i++) {
          expect(typeof articles[i].article_id).toBe("number");
          expect(typeof articles[i].title).toBe("string");
          expect(typeof articles[i].topic).toBe("string");
          expect(typeof articles[i].author).toBe("string");
          expect(typeof articles[i].created_at).toBe("string");
          expect(typeof articles[i].votes).toBe("number");
          expect(typeof articles[i].article_img_url).toBe("string");
          expect(typeof articles[i].comment_count).toBe("number");
        }
        let datesArray = articles.map(
          (article) => new Date(article.created_at)
        );
        expect(datesArray).toBeSorted({ descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with comments of an article_id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).toBe(2);
        for (let i = 0; i < res.body.comments[0].length - 1; i++) {
          expect(typeof res.body.comments[0][i].comment_id).toBe("number");
          expect(typeof res.body.comments[0][i].article_id).toBe("number");
          expect(typeof res.body.comments[0][i].body).toBe("string");
          expect(typeof res.body.comments[0][i].votes).toBe("number");
          expect(typeof res.body.comments[0][i].author).toBe("string");
          expect(typeof res.body.comments[0][i].created_at).toBe("string");
        }
        let datesArray = res.body.comments.map(
          (comment) => new Date(comment.created_at)
        );
        expect(datesArray).toBeSorted({ descending: true });
      });
  });
  test("404: article_id not found", () => {
    return request(app)
      .get("/api/articles/2000/comments")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: "Article not found" });
      });
  });
  test("200: comments not found", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toEqual([]);
      });
  });

  test("400: invalid article_id", () => {
    return request(app)
      .get("/api/articles/abc/comments")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Invalid Article ID" });
      });
  });
});

describe.only("POST /api/articles/:article_id/comments", () => {
  test("should return 201, add a new comment and retrieve it", async () => {
    const commentData = {
      body: "test comment",
      author: "icellusedkars",
    };

    return request(app)
      .post("/api/articles/3/comments")
      .send(commentData)
      .expect(201)
      .then((res) => {
        
        expect(typeof res.body.comment.comment_id).toBe("number");
        expect(typeof res.body.comment.article_id).toBe("number");
        expect(typeof res.body.comment.body).toBe("string");
        expect(typeof res.body.comment.votes).toBe("number");
        expect(typeof res.body.comment.author).toBe("string");
        expect(typeof res.body.comment.created_at).toBe("string");
      });
  });

  test("should return 400 if required fields are missing", async () => {
    const commentData = {}; 
    return request(app)
      .post("/api/articles/3/comments")
      .send(commentData)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Missing required fields" });
      });
  });

  test("should return 404 if article does not exist", async () => {
    const commentData = {
      body: "This is a test comment",
      author: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(commentData)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: "Article not found" });
      });
  });

  test("400: posting with no author", () => {
    return request(app)
      .post("/api/articles/3/comments") 
      .send({ body: "test comment 500", author: null })//no user
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Missing required fields" });
      });
  });
  test("400: posting with no comment", () => {
    return request(app)
      .post("/api/articles/3/comments") 
      .send({ body: null, author: "icellusedkars" })//no user
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Missing required fields" });
      });
  });

  test("400: posting with invalid article_id", () => {
    return request(app)
      .post("/api/articles/not-an-id/comments") // Invalid ID format
      .send({ body: "test comment 500", author: "icellusedkars" })
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({ error: "Invalid Article ID" });
      });
  });

  // test("500: responds with server error for unexpected issues", () => {
  //   return request(app)
  //     .post("/api/articles/not-an-id/comments") 
  //     .send({ body: "test comment 500", author: null }) //null author
  //     .expect(500)
  //     .then((res) => {
  //       expect(res.body).toEqual({ error: "Internal Server Error" });
  //     });
  // });
});

describe("PATCH /api/articles/:article_id", () => {
  test("201: updates votes of an article_id", () => {
    const vote = { inc_votes: 2 };
    return request(app)
      .patch("/api/articles/3")
      .send(vote)
      .expect(201)
      .then((res) => {
        expect(res.body.votes).toBe(2);
      });
  });
  test("404: article_id doesn't exist", () => {
    return request(app)
      .patch("/api/articles/999")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: "Article not found" });
      });
  });

  test("400: invalid inc_votes value", () => {
    const vote = { inc_votes: "newVote" };
    return request(app)
      .patch("/api/articles/3")
      .send(vote)
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ error: "Missing required fields" });
      });
  });
});
