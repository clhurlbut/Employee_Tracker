DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);
CREATE TABLE acting_role (
  acting_role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dept_id INT,
  PRIMARY KEY (acting_role_id),
  FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES acting_role(acting_role_id)
);
