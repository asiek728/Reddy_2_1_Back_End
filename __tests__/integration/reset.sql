TRUNCATE post RESTART IDENTITY;

INSERT INTO post (title, image_source, content) 
VALUES
    ('This is a test', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test'),
    ('This is a test2', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test2'),
    ('This is a test3', 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png', 'Test3');