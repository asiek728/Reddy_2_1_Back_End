const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`APP listening on port ${process.env.PORT}...`);
})
