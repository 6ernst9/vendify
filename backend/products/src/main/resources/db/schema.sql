DROP TABLE IF EXISTS products;

CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          store VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          images TEXT[],
                          category VARCHAR(255) NOT NULL,
                          price DOUBLE PRECISION NOT NULL,
                          old_price DOUBLE PRECISION,
                          description TEXT,
                          reviews DOUBLE PRECISION DEFAULT 0,
                          no_reviews DOUBLE PRECISION DEFAULT 0,
                          stock INT DEFAULT 0

);
