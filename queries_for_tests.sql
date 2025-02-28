
\c nc_news_test


\echo '\n View all users \n'
SELECT * FROM users;

\echo '\n Get all of the articles where the topic is coding\n'
Select * FROM articles
WHERE topic = 'coding';

\echo '\n Get all of the comments where the votes are less than zero\n'
Select * FROM comments
WHERE votes < 0;

\echo '\n Get all of the topics\n'
Select * FROM topics;

\echo '\n Get all of the articles by user grumpy19\n'
Select * FROM articles JOIN users on articles.author = users.username
WHERE username = 'grumpy19';

\echo '\n Get all of the comments that have more than 10 votes.\n'
Select * FROM comments 
WHERE votes > 10;

