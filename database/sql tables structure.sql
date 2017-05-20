create table products (
	id INT UNSIGNED auto_increment primary key NOT NULL,
	p_name varchar(100) NOT NULL UNIQUE,
	barcode BIGINT UNSIGNED NOT NULL UNIQUE,
	price int UNSIGNED NOT NULL,
	vat TINYINT UNSIGNED NOT NULL,
	available_quantity MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
	image_url varchar(80) NOT NULL DEFAULT 'N/A',
	description_file_url varchar(80) NOT NULL DEFAULT 'N/A',
	rating TINYINT NULL,
	total_ratings INT UNSIGNED NOT NULL DEFAULT 0
);


insert into products(p_name, barcode, price, vat, available_quantity) values
	('Google pixel', '0762042122590', 60000, 15, 150),
	('Microsoft lumia 950', '6438158746008', 30000, 17, 50),
	('Apple iphone 7 plus 128GB', '190198047946', 70000, 15.5, 250),
	('Samsung galaxy S8 64GB', '759776452499', 58000, 15, 10),
	('LG G6 64GB', '730309275792', 50000, 15, 300),
	('lenovo p2', '190576404316', 18000, 13, 550),
	('Motorola G5 plus', '723755011106', 17000, 15, 500),
	('Apple macbook air', '888462341530', 80000, 15.5, 60),	
	('Microsoft surface book i5 8GB 256GB', '889842015362', 100000, 17, 60);