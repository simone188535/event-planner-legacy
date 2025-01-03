-- if this db already exists, delete it
DROP DATABASE IF EXISTS event_planner_legacy;

-- create a new db
CREATE DATABASE event_planner_legacy;

-- Move into the db
\c event_planner_legacy;