--database name : school
CREATE DATABASE school_database;

-- Create students table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    gender ENUM("Male","Female","Other")
);

-- Insert sample data into students table
INSERT INTO students (name, age, gender) VALUES
('John Doe', 18, 'Male'),
('Jane Smith', 17, 'Female'),
('Michael Johnson', 19, 'Male'),
('Emily Davis', 18, 'Female');

-- Create courses table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(50),
    instructor VARCHAR(50),
    credits INT
);

-- Insert sample data into courses table
INSERT INTO courses (course_name, instructor, credits) VALUES
('Mathematics', 'Mr. Brown', 4),
('Science', 'Ms. White', 3),
('History', 'Mr. Green', 3),
('English', 'Ms. Johnson', 4);


-- Altering a Table (Adding a New Column):
ALTER TABLE students
ADD COLUMN email VARCHAR(100);

--SELECT Statement: Retrieves data from one or more tables.
--Description: Selects all columns from the students table, returning information about all students.
SELECT * FROM students;
SELECT COUNT(1) FROM students WHERE EMAIL IS NULL

-- LIMIT and OFFSET: Limits the number of rows returned by a query and specifies the starting point for returning rows.
-- Description: Retrieves two rows from the students table, starting from the second row.
SELECT * FROM students LIMIT 2 OFFSET 1;

--WHERE Clause: Filters records based on specified conditions.
SELECT * FROM students WHERE age > 18;


-- LIKE Clause: Used to search for a specified pattern in a column.
-- Description: Retrieves all students whose name contains 'Johnson'.
SELECT * FROM students WHERE name LIKE '%Johnson%';
SELECT * FROM students WHERE name LIKE '%J%';
SELECT * FROM students WHERE name LIKE '%J';
SELECT * FROM students WHERE name LIKE 'J%';

-- INSERT INTO: Inserts new records into a table.
-- Description: Inserts a new student record into the students table with the specified name, age, and gender.
INSERT INTO students (name, age, gender) VALUES ('Sarah Johnson', 17, 'Female');


-- UPDATE: Modifies existing records in a table.
-- Description: Updates the age of the student named 'John Doe' to 20 in the students table.
UPDATE students SET age = 20 WHERE name = 'John Doe';

-- DELETE: Deletes records from a table.
-- Description: Deletes the student record with the name 'Emily Davis' from the students table.
DELETE FROM students WHERE name = 'Emily Davis';


-- sub query statement
update students set email = 'something@gmail.com' where student_id in 
( select student_id from students where email = ' ')



-------------------------------------------------------------------------------------------------------------------

-- Create grades table
CREATE TABLE grades (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade DECIMAL(4,2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Insert sample data into grades table
INSERT INTO grades (student_id, course_id, grade) VALUES
(1, 1, 85.5),
(2, 1, 92.0),
(3, 2, 78.3),
(4, 2, 88.9);


-- CASE Statement: Allows for conditional logic within a SQL statement.
-- Description: Classifies students into age groups based on their age.

SELECT name, 
       CASE 
           WHEN age < 18 THEN 'Minor' 
           ELSE 'Adult' 
       END AS age_group 
FROM students;

-- GROUP BY: Groups rows that have the same values into summary rows.
-- Description: Calculates the average grade for each course.

SELECT course_id, AVG(grade) AS avg_grade
FROM grades
GROUP BY course_id;


-- groups by with left join
SELECT b.course_name, AVG(a.grade) AS avg_grade FROM grades as a 
left join courses as b on b.course_id = a.course_id GROUP BY a.course_id



-- TRIGGER: A set of SQL statements associated with a particular table 
-- that are automatically executed (triggered) when a specific event occurs.


-- Create the male_students table
CREATE TABLE male_students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Create a trigger to insert data into 'male_students' table when a new male student is inserted into 'students' table
CREATE TRIGGER insert_into_male_students
AFTER INSERT ON students
FOR EACH ROW
BEGIN
    IF NEW.gender = 'Male' THEN
        INSERT INTO male_students (student_id, name)
        VALUES (NEW.student_id, NEW.name);
    END IF;
END


-- Description: Defines a trigger that prevents inserting a student with a negative age.

CREATE TRIGGER before_student_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    IF NEW.age < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Age cannot be negative';
    END IF;
END;

-------------------------------------------------------------------------------------------------------------------

-- INNER JOIN: Returns only the rows that have matching values in both tables.
-- Description: This query retrieves the names of students and the names 
-- of courses they are enrolled in, but only includes those students who have grades and courses they are enrolled in.

SELECT students.name, courses.course_name
FROM students
INNER JOIN grades ON students.student_id = grades.student_id
INNER JOIN courses ON grades.course_id = courses.course_id;



-- LEFT JOIN: Returns all rows from the left table (students), and the matched rows from the right table (grades). 
-- If there is no match, the result is NULL from the right side.

SELECT students.name, courses.course_name, grades.grade
FROM students
LEFT JOIN grades ON students.student_id = grades.student_id
LEFT JOIN courses ON grades.course_id = courses.course_id;



-- RIGHT JOIN: Returns all rows from the right table (grades), and the matched rows from the left table (students). 
-- If there is no match, the result is NULL from the left side.

SELECT students.name, courses.course_name, grades.grade
FROM students
RIGHT JOIN grades ON students.student_id = grades.student_id
RIGHT JOIN courses ON grades.course_id = courses.course_id;




-- SELF JOIN: Joins a table to itself.
-- This query retrieves the names of employees and their respective managers. 
-- It joins the "employees" table to itself using aliases "manager" and "employee".

SELECT manager.name AS manager_name, employee.name AS employee_name
FROM employees AS manager
INNER JOIN employees AS employee ON manager.employee_id = employee.manager_id;


-- CROSS JOIN: Returns the Cartesian product of the two tables,
--  meaning it returns all possible combinations of rows from both tables.
SELECT students.name, courses.course_name
FROM students
CROSS JOIN courses;


-- INNER JOIN: Returns records that have matching values in both tables
-- LEFT JOIN: Returns all records from the left table, and the matched records from the right table
-- RIGHT JOIN: Returns all records from the right table, and the matched records from the left table
-- CROSS JOIN: Returns all records from both tables

