const { createTaskModel, getTasksModel, getTaskModel, updateTaskModel } = require('../models/taskModel');
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

const updateTaskService = async (id, { task, status }) => {
  taskValidation(task, status);

  await updateTaskModel(id, { task, status })

  const updatedTask = await getTaskModel(id);

  return updatedTask;
}

module.exports = {
  createTaskService,
  getTasksService,
  updateTaskService,
}
