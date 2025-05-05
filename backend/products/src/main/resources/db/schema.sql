DROP TABLE IF EXISTS products;

CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          store VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          images TEXT[],
                          category VARCHAR(255) NOT NULL,
                          sizes TEXT[],
                          price DOUBLE PRECISION NOT NULL,
                          description TEXT,
                          reviews DOUBLE PRECISION DEFAULT 0,
                          stock INT DEFAULT 0
);
