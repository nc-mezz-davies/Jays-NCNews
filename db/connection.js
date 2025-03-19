const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})

const db = new Pool();
const config = {};

if (!process.env.PGDATABASE&& !process.env.DATABASE_URL) {
    throw new Error("No PGDATABASE set or configured")
} else { 
    console.log(`Connected to ${process.env.PGDATABASE}`)
}

if (ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
    console.log("prod env selected")
  }
  module.exports = new Pool(config), db;


