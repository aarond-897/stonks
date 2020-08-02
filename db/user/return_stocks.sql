SELECT
    s.stock_id,
    s.name,
    s.ticker,
    s.industry,
    us.user_id,
    us.stock_id,
    us.quantity
FROM stock s
INNER JOIN users_stock us
ON us.stock_id = s.stock_id
WHERE us.user_id =${user_id}
ORDER BY s.industry;
    