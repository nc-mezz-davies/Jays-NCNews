const endpointsJson = require("../endpoints.json");
const request = require('supertest');
const db = require("../db/connection.js");
const {app} = require("../app.js");
const testData = require("../db/data/test-data/index.js")
const seed = require('../db/seeds/seed.js')

beforeEach(() => {
  return seed(testData); 
});

afterAll(() => {
  return db.end(); 
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
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        console.log(res.body, "<<result of get api/topics")
       // expect(typeof res.body).toBe("object")
        //needs key
        //response- body
        //(res.body.topics)
        //returns rows- array of objects
        //foreach through every object, verify the shape 
        
        expect (res.body.topics.length).toBe(3);
        res.body.topics.forEach(topic => {
          expect(typeof topic.slug).toBe("string")
          expect(typeof topic.description).toBe("string")

        });
      });
  });
});