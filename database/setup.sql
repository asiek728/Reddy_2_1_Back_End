DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_user;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    date DATE,
    title VARCHAR (100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
    );

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE task (
    id INT GENERATED ALWAYS AS IDENTITY,
    task_name VARCHAR (100) NOT NULL,
    status VARCHAR(50) DEFAULT 'not done',
    num_volunteers_needed INT,
    start_date DATE,
    PRIMARY KEY (id)
    
);

CREATE TABLE task_user (
    user_id INT,
    task_id INT,
    start_date DATE,
    end_date DATE,
    done_flag_user BOOLEAN DEFAULT false,
    done_flag_admin BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id),
    FOREIGN KEY (task_id) REFERENCES task(id)
    
);



INSERT INTO task (task_name, num_volunteers_needed, start_date)
VALUES ('Task 1', 3, '2023-11-10');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Task 2', 'in progress', 5, '2023-11-15');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Task 3', 'completed', 2, '2023-11-20');


INSERT INTO task (task_name, num_volunteers_needed, start_date)
VALUES ('Task 4', 1, '2023-11-25');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Task 5', 'not done', 4, '2023-11-30');
