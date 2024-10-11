DROP TABLE IF EXISTS user;

CREATE TABLE user (
                          id SERIAL PRIMARY KEY,
                          username VARCHAR(255) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          first_name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255) NOT NULL,
                          age INTEGER NOT NULL,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          phone_number VARCHAR(255) NOT NULL UNIQUE,
                          session_id BIGINT);