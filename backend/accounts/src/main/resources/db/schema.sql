DROP TABLE IF EXISTS users;

CREATE TABLE users (
                          id BIGSERIAL PRIMARY KEY,
                          password VARCHAR(255) NOT NULL,
                          first_name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          phone_number VARCHAR(255) NOT NULL,
                          store_id VARCHAR(255) NOT NULL);