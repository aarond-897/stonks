INSERT INTO users
(username, email, hash, profile_picture)
VALUES
(${username},${email},${password},${profilePicture})
returning users.username, users.profile_picture, users.email, users.user_id;