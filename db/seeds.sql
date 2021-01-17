USE employees_db;
INSERT INTO department (dept_name) VALUES
('Management'),
('Horse Care'),
('Services');

INSERT INTO acting_role (title, salary, dept_id) VALUES 
('Executive Director', 100000.00, 1), 
('Volunteer Coordinator', 30000.00, 1), 
('Office Manager', 28000.00, 1), 
('Barn Manager', 34000.00, 2), 
('Horse Care Specialist', 44000.00, 2),
('Riding Instructor', 36000.00, 3), 
('Therapist', 140000.00, 3),
('Farmhand', 24000.00, 2), 
('Job Coach', 29000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Sally', 'Salamander', 1, NULL),
('Albert', 'Phish', 2, 3),
('Laura', 'Compliner', 3, 1),
('Ava', 'Lindly', 4, NULL),
('Oliver', 'Rose', 5, 2),
('Rebecca', 'Volter', 6, 2),
('Marcus', 'Enning', 7, NULL),
('John', 'Greenhorn', 8, 9),
('Gary', 'Bluprie', 9, 2);


