const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/", userController.index);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
