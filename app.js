const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const postRouter = require('./routers/post')
const tokenRouter = require('./routers/token')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const user_taskRouter = require ('./routers/user_task')
const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: "welcome",
        description: "Council API",
        endpoints: [
            "GET    /                200",
            "GET    /posts           200",
            "GET    /posts/:id       200",
            "POST   /posts           201",
            "PATCH  /posts/:id       200",
            "DELETE /posts/:id       204",
            "GET    /tasks           200",
            "POST   /tasks           200",
            "GET    /tasks/:id       200",
            "PATCH  /tasks/:id       200",
            "DELETE /tasks/:id       204",
            "GET    /tokens          200",
            "DELETE /tokens/:token   204",
            "GET    /users           200",
            "GET    /users/:id       200",
            "GET    /users_tasks     200",
            "POST   /users_tasks/:id 200",
            "POST   /users/register  201",
            "POST   /users/login     201",
        ]
    })
})

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/tokens",tokenRouter)
app.use("/tasks",taskRouter)
app.use("/users_tasks", user_taskRouter)


app.post('/', (req, res) => {
    res.status(405).send('Not allowed!')
});

module.exports = app
