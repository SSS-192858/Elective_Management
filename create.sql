drop database if exists elective_management;
create database elective_management;
use elective_management;
create table user(
    user_id INTEGER PRIMARY KEY auto_increment,
    username varchar(100) UNIQUE NOT NULL,
    password char(68) NOT NULL
);
CREATE TABLE role (
    role_id INTEGER NOT NULL auto_increment,
    role_name varchar(100) NOT NULL,
    constraint pk_role PRIMARY KEY (role_id)
);
CREATE TABLE user_roles (
    user_id INTEGER auto_increment,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE student(
    student_id INTEGER auto_increment,
    user_id INTEGER UNIQUE NOT NULL,
    student_name varchar(100) DEFAULT NULL,
    student_email varchar(100) DEFAULT NULL,
    student_phno varchar(100) DEFAULT NULL,
    constraint pk_student PRIMARY KEY (student_id)
);

CREATE TABLE instructor(
    instructor_code INTEGER auto_increment,
    user_id INTEGER UNIQUE NOT NULL,
    instructor_name varchar(100) DEFAULT NULL,
    instructor_email varchar(100) DEFAULT NULL,
    instructor_phno varchar(100) DEFAULT NULL,
    constraint pk_instructor PRIMARY KEY (instructor_code)
);
CREATE TABLE subjects(
    subject_code INTEGER auto_increment,
    instructor_code INTEGER,
    subject_name varchar(50) DEFAULT NULL,
    subject_desc varchar(500) DEFAULT NULL,
    constraint pk_subject PRIMARY KEY (subject_code)
);
CREATE TABLE request(
    slno INTEGER auto_increment,
    student_id INTEGER,
    subject_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_request PRIMARY KEY (slno)
);
CREATE TABLE student_subject(
    slno INTEGER auto_increment,
    student_id INTEGER,
    subject_code INTEGER,
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_cust_cab PRIMARY KEY (slno)
);
ALTER TABLE user_roles
ADD CONSTRAINT fk_user_userRoles
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE user_roles
ADD CONSTRAINT fk_role_userRoles
FOREIGN KEY (role_id) REFERENCES role(role_id) on delete cascade;

ALTER TABLE student
ADD CONSTRAINT fk_student_user
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE instructor
ADD CONSTRAINT fk_instructor_user
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE request
ADD CONSTRAINT fk_stud_request
FOREIGN KEY (student_id) REFERENCES student(student_id) on delete cascade;

ALTER TABLE request
ADD CONSTRAINT fk_subject_request
FOREIGN KEY (subject_code) REFERENCES subjects(subject_code) on delete cascade;

ALTER TABLE student_subject
ADD CONSTRAINT fk_sub_stud_id
FOREIGN KEY (student_id) REFERENCES student(student_id) on delete cascade;

ALTER TABLE student_subject
ADD CONSTRAINT fk_sub_stud_subcode
FOREIGN KEY (subject_code) REFERENCES subjects(subject_code) on delete cascade;

INSERT INTO role values (1,'ADMIN'),(2,'INSTRUCTOR'),(3,'STUDENT');
INSERT INTO user values (1,"admin","$2a$09$vnS0G1MqX2hQEvk2v6O1L.A7x7zZfMnm55fwL26G4sX/ypjMk7W4O");
-- test123
INSERT INTO user values (2,"instructor","$2a$09$vnS0G1MqX2hQEvk2v6O1L.A7x7zZfMnm55fwL26G4sX/ypjMk7W4O");
INSERT INTO user values (3,"student","$2a$09$vnS0G1MqX2hQEvk2v6O1L.A7x7zZfMnm55fwL26G4sX/ypjMk7W4O");

INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "instructor";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "student";
