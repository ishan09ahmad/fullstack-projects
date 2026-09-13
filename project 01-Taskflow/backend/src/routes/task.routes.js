import expres from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import taskController from "../controllers/task.controller.js";

const taskRouter = expres.Router();

taskRouter.post("/add-task", authMiddleware.authUser, taskController.addTask);

taskRouter.get("/getTasks", authMiddleware.authUser, taskController.getTask);

taskRouter.post(
  "/updateTask",
  authMiddleware.authUser,
  taskController.updateTask,
);

taskRouter.post(
  "/toggleCompleted",
  authMiddleware.authUser,
  taskController.toggleCompleted,
);

taskRouter.post(
  "/toggleImportant",
  authMiddleware.authUser,
  taskController.toggleImportant,
);

taskRouter.post(
  "/deleteTask",
  authMiddleware.authUser,
  taskController.deleteTask,
);

export default taskRouter;
