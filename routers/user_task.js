const { Router } = require('express');

// const authenticator = require("../middleware/authenticator");
const user_taskController = require('../controllers/user_task.js');

const user_taskRouter = Router();

// user_taskRouter.get("/", authenticator, taskController.index);
user_taskRouter.get("/", user_taskController.index);
user_taskRouter.get("/:id", user_taskController.show);
user_taskRouter.post("/", user_taskController.create);


module.exports = user_taskRouter;
