DROP TABLE IF EXISTS session;

CREATE TABLE session (
                         id SERIAL PRIMARY KEY,
                         last_activity TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                         user_id BIGINT,
                         access_token VARCHAR(255),
                         refresh_token VARCHAR(255)
);