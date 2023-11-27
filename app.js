const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const postRouter = require('./routers/post')
const tokenRouter = require('./routers/token')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()

app.use(express.json())
// if (process.env.NODE_ENV !== "test") 
app.use(logger('dev'))
app.use(cors())

//app.use('/posts', postsRoutes)

app.get('/', (req, res) => {
    res.send({
        message: "welcome",
        description: "DIARY API",
        endpoints: [
            "GET    /            200",
            "GET    /posts       200",
            "GET    /posts/:id   200",
            "POST   /posts       201",
            "PATCH  /posts/:id   200",
            "DELETE /posts/:id   204",
        ]
    })
})

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/tokens",tokenRouter)
app.use("/tasks",taskRouter)

app.post('/', (req, res) => {
    res.status(405).send('Not allowed!')
});

module.exports = app
