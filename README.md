# NC News Seeding

- Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news


-please run npm-install
-please run npm run setup-dbs to create the necessary databases locally. 

-inside setup-dbs.sql, make a note of the database names "nc_news" and "nc_news_test".
-create two .env files, ".env.development" and ".env.test".
these files should contain the text "PGDATABASE = " and the name of its database.

-verify setup by running:
-npm run test-seed
-npm run seed-dev
