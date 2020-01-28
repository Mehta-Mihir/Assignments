CREATE PROCEDURE findProducts(@store_number AS INT)
AS
BEGIN
	DECLARE @sales_total INT;
	DECLARE @output VARCHAR;

	INSERT INTO #sales_analysis1
	SELECT
		store_id
	FROM
		sales.stores;

	INSERT INTO #sales_analysis2
	SELECT
		sales.orders.order_id,
		#sales_analysis1.store_id
	FROM
		sales.orders,#sales_analysis1
	WHERE 
		sales.orders.store_id = #sales_analysis1.store_id;

	SELECT
		@sales_total = SUM(sales.order_items.list_price * sales.order_items.quantity)
	FROM
		#sales_analysis2,sales.order_items
	WHERE
		#sales_analysis2.store_id=@store_number AND sales.order_items.order_id=#sales_analysis2.order_id;

	PRINT @sales_total;
	PRINT @store_number;

	SELECT @output=@sales_total+" "+@store_number FOR JSON AUTO;
END;

CREATE TABLE #sales_analysis1 (
	store_id INT
);

CREATE TABLE #sales_analysis2 (
	order_id INT,
	store_id INT
);

DECLARE @sales INT; 
EXEC findProducts 1;

DROP PROCEDURE findProducts;

SELECT * FROM #sales_analysis1;

DROP TABLE #sales_analysis1;

DROP TABLE #sales_analysis2;

SELECT * FROM #sales_analysis2;

SELECT
	sales.orders.order_id,
	#sales_analysis1.store_id
FROM
	sales.orders,#sales_analysis1
WHERE sales.orders.store_id = #sales_analysis1.store_id;

SELECT
	SUM(sales.order_items.list_price * sales.order_items.quantity)
FROM
	#sales_analysis2,sales.order_items
WHERE
	#sales_analysis2.store_id=3 AND sales.order_items.order_id=#sales_analysis2.order_id;
	

SELECT
	SUM(sales.order_items.list_price * sales.order_items.quantity) AS TOTAL
FROM
	#sales_analysis2,sales.order_items
WHERE
	#sales_analysis2.store_id=3 AND sales.order_items.order_id=#sales_analysis2.order_id FOR JSON AUTO;