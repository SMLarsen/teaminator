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

INSERT INTO team (project_id, team_size)
VALUES (
