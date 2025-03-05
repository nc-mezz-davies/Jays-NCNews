# NC News Seeding

- Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news


-please run npm-install
-please run npm run setup-dbs to create the necessary databases locally. 

-inside setup-dbs.sql, note the database names "nc_news" and "nc_news_test".
-create two .env files:
these files should contain their respective text.

.env.development - contains...
PGDATABASE=nc_news

.env.test - contains...
PGDATABASE=nc_news_test



-verify setup by running:
-npm run test-seed
-npm run seed-dev
