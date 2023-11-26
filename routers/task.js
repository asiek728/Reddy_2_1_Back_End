const { Router } = require('express');

// const authenticator = require("../middleware/authenticator");
const taskController = require('../controllers/task.js');

const taskRouter = Router();

// taskRouter.get("/", authenticator, taskController.index);
taskRouter.get("/", taskController.index);
taskRouter.post("/", taskController.create);
taskRouter.get("/:id", taskController.show);
taskRouter.patch("/:id",taskController.update);
taskRouter.delete("/:id", taskController.destroy);

module.exports = taskRouter;
