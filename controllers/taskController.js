const { createTaskService, getTasksService } = require('../services/taskService');
const { created, success } = require('../utils/dictionary');

const createTaskController = async (req, res, next) => {
  try {
    const { task, status } = req.body;

    const taskCreated = await createTaskService(task, status);

    return res.status(created).json(taskCreated);
  } catch (error) {
    console.log(`POST CREATE RECIPES -> ${error.message}`);
    next(error);
  }
}

const getTasksController = async (req, res, next) => {
  try {
    const tasks = await getTasksService();

    return res.status(success).json(tasks);
  } catch (error) {
    console.log(`GET TASKS -> ${console.log(error.message)}`);
    next(error);
  }
}

module.exports = {
  createTaskController,
  getTasksController,
}
