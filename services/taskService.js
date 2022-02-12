const { createTaskModel } = require('../models/taskModel');
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

module.exports = {
  createTaskService,
}
