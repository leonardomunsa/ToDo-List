const { createTaskModel, getTasksModel } = require('../models/taskModel');
const taskValidation = require('../utils/validations');

const createTaskService = async (task, status) => {
  
  taskValidation(task, status);

  const id = await createTaskModel(task, status);

  return {
    task,
    status,
    _id: id,
  }
}

const getTasksService = async () => {
  const tasks = await getTasksModel();

  if (!tasks) return [];

  return tasks;
}

module.exports = {
  createTaskService,
  getTasksService,
}
