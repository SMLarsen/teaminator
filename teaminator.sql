CREATE TABLE cohort (
id SERIAL PRIMARY KEY,
name VARCHAR(50)
);

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

CREATE TABLE team (
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES project,
team_size INTEGER,
name VARCHAR(50)
);

CREATE TABLE team_member (
id SERIAL PRIMARY KEY,
team_id INTEGER REFERENCES team,
person_id INTEGER REFERENCES person
);
