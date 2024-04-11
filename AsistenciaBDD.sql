DROP
    DATABASE IF EXISTS asistencia;
CREATE
    DATABASE asistencia;
USE
    asistencia;

CREATE TABLE students
(
    carnet     VARCHAR(30) PRIMARY KEY,
    fullname   VARCHAR(200) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    cellphone  VARCHAR(12),
    grade      INT(10)      NOT NULL,
    created_at TIMESTAMP default NOW()
);

CREATE TABLE encodings
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    id_student VARCHAR(30) NOT NULL UNIQUE,
    name       VARCHAR(100),
    created_at TIMESTAMP default NOW(),
    FOREIGN KEY (id_student) REFERENCES students (carnet)
);

CREATE TABLE professors
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    fullname   VARCHAR(200) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    cellphone  VARCHAR(12),
    isAdmin    BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP default NOW()
);
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    id_professor int                not null unique,
    username     varchar(30) unique not null,
    password     varchar(100)       not null,
    created_at   TIMESTAMP default NOW(),
    FOREIGN KEY (id_professor) REFERENCES professors (id)
);
CREATE TABLE classrooms
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);
DROP TABLE IF EXISTS classes;
CREATE TABLE classes
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100) NOT NULL,
    grade      INT          NOT NULL,
    created_at TIMESTAMP default NOW()
);

DROP TABLE IF EXISTS class_groups;
CREATE TABLE class_groups
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    id_class     INT NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY (id_class) REFERENCES classes (id),
    FOREIGN KEY (id_professor) REFERENCES professors (id)
);
DROP TABLE IF EXISTS class_schedule;
CREATE TABLE class_schedule
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    id_group     INT,
    id_classroom INT NOT NULL,
    time_class   TIME,
    day_class    VARCHAR(200),
    UNIQUE KEY (time_class, day_class, id_classroom),
    FOREIGN KEY (id_classroom) REFERENCES classrooms (id),
    FOREIGN KEY (id_group) REFERENCES class_groups (id)
);
DROP TABLE IF EXISTS groupmembers;
CREATE TABLE groupmembers
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    id_group   INT         NOT NULL,
    id_student VARCHAR(30) NOT NULL,
    UNIQUE KEY (id_group, id_student),
    FOREIGN KEY (id_group) REFERENCES class_groups (id),
    FOREIGN KEY (id_student) REFERENCES students (carnet)
);
DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    id_student     VARCHAR(30) NOT NULL,
    attendance_day DATE,
    id_class       INT         NOT NULL,
    id_professor   INT         NOT NULL,
    unique key (id_student, attendance_day, id_class),
    UNIQUE KEY (id_student, id_class),
    FOREIGN KEY (id_student) REFERENCES students (carnet),
    FOREIGN KEY (id_class) REFERENCES classes (id),
    FOREIGN KEY (id_professor) REFERENCES professors (id)
);

CREATE TABLE permissions
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE user_permissions
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    id_professor  INT NOT NULL,
    id_permission INT NOT NULL,
    UNIQUE KEY (id_professor, id_permission),
    FOREIGN KEY (id_professor) REFERENCES professors (id),
    FOREIGN KEY (id_permission) REFERENCES permissions (id)
);

DELIMITER
//

CREATE TRIGGER after_insert_professor
    AFTER INSERT
    ON professors
    FOR EACH ROW
BEGIN
    INSERT INTO user_permissions (id_professor, id_permission) VALUES (NEW.id, 1);
    INSERT INTO user_permissions (id_professor, id_permission) VALUES (NEW.id, 2);
END //

SELECT COUNT(*)
FROM class_schedule
WHERE id_classroom = 2
  AND time_class = '9:00:00'
  AND day_class = 'Lunes';

SELECT cs.*, cl.name
FROM class_schedule cs
         JOIN classrooms cl ON cl.id = cs.id_classroom;

SELECT cg.*, c.name as clase, c.grade as anyo, p.fullname as profesor, cs.day_class, cs.time_class, cl.name as aula
FROM class_groups as cg
         JOIN classes as c on c.id = cg.id_class
         JOIN professors p on cg.id_professor = p.id
         JOIN class_schedule cs on cg.id = cs.id_group
         JOIN classrooms cl on cs.id_classroom = cl.id