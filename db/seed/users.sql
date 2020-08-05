CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(150),
    hash VARCHAR(250),
    profile_picture TEXT,
    username VARCHAR(20)
);
