UPDATE users_stock
SET quantity = users_stock.quantity- ${quantity}
WHERE user_id=${user_id} AND stock_id=${stock_id};