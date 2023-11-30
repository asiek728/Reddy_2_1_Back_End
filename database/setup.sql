DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS task_user;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS task;

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
    image_source VARCHAR(200) NOT NULL,
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
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    task_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
    FOREIGN KEY (task_id) REFERENCES task(id)
);


INSERT INTO task (task_name, num_volunteers_needed, start_date)
VALUES ('Babysit toddlers', 3, '2023-11-10');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Count books', 'in progress', 5, '2023-11-15');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('IT help', 'completed', 5, '2023-11-20');


INSERT INTO task (task_name, num_volunteers_needed, start_date)
VALUES ('Reading books for children', 8, '2023-11-25');


INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Help in community garden', 'not done', 4, '2023-11-30');

INSERT INTO task (task_name, status, num_volunteers_needed, start_date)
VALUES ('Help with craft market', 'not done', 6, '2023-11-26');


INSERT INTO user_account (username, password, email, isAdmin)
VALUES ('aaa', 'aaa', 'aaa@aaa.aaa', false);

INSERT INTO user_account (username, password, email, isAdmin)
VALUES ('admin', '$2b$12$wTz5JxBRClk3mIv2QbtXQ.c3OB2U9CqdOwlLCjm2pPCv6pcUISDp2', 'admin@council.com', true);






INSERT INTO task_user (user_id, task_id)
VALUES (1, 3);

INSERT INTO post (date, title, image_source, content)
VALUES ('2023-11-30', 'Library Rennovation', 'https://www.reading.ac.uk/library/-/media/project/functions/library/images/refurb-pictures/refurbexternal2.jpg?la=en&hash=7257596A2B71C8A23FE4F625D53BC4D4', 'We have recieved a generous donation of over £40 million for the refurbishment of the Library. This will include exxtra study spaces and furniture. This will be open to the public by June 2024!');

INSERT INTO post (date, title, image_source, content)
VALUES ('2023-11-30', 'Free Homework Support', 'https://www.youthemployment.org.uk/dev/wp-content/uploads/2021/03/school-advice-students.jpg', 'We are offering free tuition in Maths, English and Science for GCSE children for those from disadvantged backgrounds');

INSERT INTO post (date, title, image_source, content)
VALUES ('2023-11-30', 'New Recycling Initiative', 'https://www.telegraph.co.uk/content/dam/environment/2023/06/02/TELEMMGLPICT000337992854_16857228652110_trans_NvBQzQNjv4Bq9ZgHWGWfvdgN-PUV7CBULdNJqZG_WVMBeQV4RVTW7AY.jpeg', 'We are teaming up with Greenpeace to propose some exciting new initiatives. Please stay tuned!');
