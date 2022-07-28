CREATE TABLE schools (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL
);


-- users (username, password, first_name, last_name, gender, email, school_code, is_admin)

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  school_code TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- competitions(id, competition, school_handle)

CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  competition TEXT NOT NULL,
  school_handle TEXT NOT NULL references schools(handle), 
  user_handle TEXT NOT NULL references users(username) 
);