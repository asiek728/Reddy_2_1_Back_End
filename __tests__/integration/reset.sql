TRUNCATE post RESTART IDENTITY;
TRUNCATE task RESTART IDENTITY;

INSERT INTO post (title, image_source, content) 
VALUES
    ('This is a test', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test'),
    ('This is a test2', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test2'),
    ('This is a test3', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test3');


INSERT INTO post (task_name, num_volunteers_needed, status, start_date) 
VALUES
    ('test', 3, 'not done', '11/11/2023'),
    ('test', 4, 'not done', '11/11/2023'),
    ('test', 5, 'not done', '11/11/2023');
