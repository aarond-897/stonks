CREATE TABLE users_stock(
    user_id INT REFERENCES users(user_id),
    stock_id INT REFERENCES stock(stock_id),
     quantity INT DEFAULT 0
 );
