CREATE TABLE schools (
  school_handle VARCHAR(25) PRIMARY KEY CHECK (school_handle = lower(school_handle)),
  school_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  logo_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  school_handle TEXT NOT NULL CHECK (school_handle = lower(school_handle)),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  paid BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE competitions (
  id SERIAL PRIMARY KEY,
  competition TEXT NOT NULL,
  description TEXT NOT NULL,
  school_handle TEXT NOT NULL 
    REFERENCES schools(school_handle), 
  username TEXT NOT NULL 
    REFERENCES users(username) 
);