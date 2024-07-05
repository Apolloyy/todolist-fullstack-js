const express = require("express");
const taskController = require("./controllers/task-controller");
const taskmiddleware = require("./middlewares/task-middleware");
const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.post("/tasks", taskmiddleware.validateTitle, taskController.addTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.put(
  "/tasks/:id",
  taskmiddleware.validateTitle,
  taskmiddleware.validateStatus,
  taskController.updateTask
);

module.exports = router;
