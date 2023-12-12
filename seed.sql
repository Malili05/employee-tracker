-- Select employee_db as the database to utilize and perform SQL operations on
USE employee_db;

-- Insert the following items to table department
INSERT INTO department(dept_name)
VALUES 

('Information Technology'),
('Logistics'),
('Accounting'),
('Marketing & Sales'),
('Human Resources');

-- Insert the following items to table role
INSERT INTO roles(title, salary, department_id)
VALUES
('Web Development Manager', 90000, 1),
('Web Dev Frontend', 90000, 1),
('Web Dev Backend', 90000, 1),

('Logistics Manager', 90000, 3),
('Logistics Supervisor', 90000, 3),
('Chief Accountant', 170000, 3),
('Accounting Manager', 70000, 3),
('Sr. Accountant', 70000, 3),
('Jr. Accountant', 70000, 3),

('Chief of Marketing', 70000, 4),
('Marketing Manager', 70000, 4),
('Sr. Market Specialist', 70000, 4), 
('Jr. Market Specialist', 70000, 4),

('HR Chief Council', 50000, 5),
('HR Council', 50000, 5),
('HR Paralegal', 50000, 5);

-- Insert the following items to table employees
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES 
('Cassian', 'Illyrio', 4, null),
('Feyre', 'Archeron', 1, null),
('Rhysand', 'Highland', 13, null),
('Morrigan', 'Hewn', 15, 3),
('Nesta', 'Silverado', 3, 2),
('Elaine', 'Flowers', 9, 1),
('Amren', 'Pewter', 12, null);