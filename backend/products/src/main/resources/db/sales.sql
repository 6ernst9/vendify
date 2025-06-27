DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           code VARCHAR(255),
                           store VARCHAR(255) NOT NULL,
                           status VARCHAR(255) NOT NULL,
                           percentage DOUBLE PRECISION NOT NULL,
                           product_ids INTEGER[],
                           end_date TIMESTAMP
);