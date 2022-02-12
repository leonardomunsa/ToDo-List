const { createTaskService } = require('../services/taskService');
const { created } = require('../utils/dictionary');

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

module.exports = {
  createTaskController,
}
