CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email_1 VARCHAR(150),
    hash_1 VARCHAR(250),
    profile_picture TEXT
);
