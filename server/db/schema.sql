-- if this db already exists, delete it
DROP DATABASE IF EXISTS event_planner_legacy_db;

-- create a new db
CREATE DATABASE event_planner_legacy_db;

-- Move into the db
\c event_planner_legacy_db;