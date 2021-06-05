CREATE TABLE repositories(
    id SERIAL PRIMARY KEY,
    title VARCHAR(64),
    author VARCHAR(64),
    lang VARCHAR(64),
    descr VARCHAR(128),
    stars INTEGER
);