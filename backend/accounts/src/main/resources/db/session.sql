DROP TABLE IF EXISTS session;

CREATE TABLE session (
                         id SERIAL PRIMARY KEY,
                         user_id BIGINT,
                         store_id TEXT,
                         session_cookie VARCHAR(255) NOT NULL,
                         access_token VARCHAR(255),
                         refresh_token VARCHAR(255),
                         start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                         last_activity TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                         end_time TIMESTAMP WITHOUT TIME ZONE,
                         pages_visited TEXT[],
                         actions TEXT[]

);