-- Database: test

-- Sequence for the user ids
CREATE SEQUENCE IF NOT EXISTS userId start 1 increment 1;
GRANT ALL PRIVILEGES ON SEQUENCE userId TO tguillouet;

-- Table User	
CREATE TABLE IF NOT EXISTS users (
	id INT PRIMARY KEY,
	username VARCHAR(40) UNIQUE
);
GRANT ALL PRIVILEGES ON TABLE users TO tguillouet;