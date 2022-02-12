const { createTaskModel } = require('../models/taskModel');
const { badRequest } = require('../utils/dictionary');
const { taskSchema } = require('../utils/schemas');

const createTaskService = async (task, status) => {
  
  const { error } = taskSchema.validate({ task, status });
  if (error) return res.status(badRequest).json({ message: error.message });

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
