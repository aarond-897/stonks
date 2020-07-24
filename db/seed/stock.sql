CREATE TABLE stock(
    stock_id SERIAL PRIMARY KEY,
    ticker VARCHAR(5),
    name VARCHAR(100),
    logo TEXT,
    industry VARCHAR(50)
);
