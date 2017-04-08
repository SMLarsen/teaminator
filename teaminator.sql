CREATE TABLE cohort (
id SERIAL PRIMARY KEY,
name VARCHAR(50)
);

INSERT INTO cohort (name)
VALUES ('Sigma')
;

SELECT * FROM cohort;

CREATE TABLE person (
id SERIAL PRIMARY KEY,
cohort_id INTEGER REFERENCES cohort,
name VARCHAR(50)
);

CREATE TABLE project (
id SERIAL PRIMARY KEY,
cohort_id INTEGER REFERENCES cohort,
team_count INTEGER,
name VARCHAR(50)
);

INSERT INTO project (cohort_id, team_count, name)
VALUES (1, 5, 'Sigma Project Teaminator')
;

SELECT * FROM project;

CREATE TABLE team (
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES project,
team_size INTEGER,
name VARCHAR(50)
);

INSERT INTO team (project_id, team_size, name)
VALUES (1, 4, 'Sigma Project Teaminator Team 1')
;

SELECT * FROM team;

CREATE TABLE team_member (
id SERIAL PRIMARY KEY,
team_id INTEGER REFERENCES team,
person_id INTEGER REFERENCES person
);

--INSERT INTO team (project_id, team_size)
--VALUES (

DROP TABLE pair;

CREATE TABLE pair (
id SERIAL PRIMARY KEY,
person1_id INTEGER REFERENCES person ON DELETE CASCADE,
person2_id INTEGER REFERENCES person ON DELETE CASCADE,
times_paired INTEGER DEFAULT 0
);

INSERT INTO pair (person1_id, person2_id) VALUES
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 11),
(1, 14),
(5, 6),
(5, 7),
(5, 8),
(5, 9),
(5, 11),
(5, 14),
(6, 7),
(6, 8),
(6, 9),
(6, 11),
(6, 14),
(7, 8),
(7, 9),
(7, 11),
(7, 14),
(8, 9),
(8, 11),
(8, 14),
(11, 14)
;



