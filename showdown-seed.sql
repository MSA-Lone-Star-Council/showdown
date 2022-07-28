-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, gender, email, school_code, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'male',
        'joel@joelburton.com',
        'tamu',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'female',
        'joel@joelburton.com',
        'uh',
        TRUE);

-- school_handle, school_name, city, state, user_handle,  

INSERT INTO schools (handle, name, city, state)
VALUES ('tamu', 'Texas A&M University', 'College Station', 'Texas'),
       ('uh', 'University of Houston', 'Houston', 'Texas');
 

-- competitions, school_handle, user_handle

INSERT INTO competitions (competition, school_handle)
VALUES ('football', 'tamu'),
       ('soccer', 'tamu'),
       ('basketball', 'tamu'),
       ('football', 'uh'),
       ('soccer', 'uh'),
       ('basketball', 'uh');
