const { createTaskModel } = require('../models/taskModel');

const createTaskService = async (task, status) => {
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
