const {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskService");
const { created, success } = require("../utils/dictionary");

const createTaskController = async (req, res, next) => {
  try {
    const { task, status } = req.body;

    const taskCreated = await createTaskService(task, status);

    return res.status(created).json(taskCreated);
  } catch (error) {
    console.log(`POST CREATE RECIPES -> ${error.message}`);
    next(error);
  }
};

const getTasksController = async (req, res, next) => {
  try {
    const tasks = await getTasksService();

    return res.status(success).json(tasks);
  } catch (error) {
    console.log(`GET TASKS -> ${error.message}`);
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDo = req.body;

    const updatedTask = await updateTaskService(id, toDo);

    return res.status(success).json(updatedTask);
  } catch (error) {
    console.log(`PUT TASK -> ${error.message}`);
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteTaskService(id);

    return res.status(success).json();
  } catch (error) {
    console.log(`DELETE TASK -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
};
