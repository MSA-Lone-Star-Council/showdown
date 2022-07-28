\echo 'Delete and recreate showdown db?'
\prompt 'Return yes or control-C to cancel > ' foo

DROP DATABASE showdown;
CREATE DATABASE showdown;
\connect showdown

\i showdown-schema.sql
\i showdown-seed.sql

\echo 'Delete and recreate showdown_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE showdown_test;
CREATE DATABASE showdown_test;
\connect showdown_test

\i showdown-schema.sql
