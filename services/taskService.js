const {
  createTaskModel,
  getTasksModel,
  getTaskModel,
  updateTaskModel,
  deleteTaskModel,
} = require("../models/taskModel");
const taskValidation = require("../utils/validations");

const createTaskService = async (task, status) => {
  taskValidation(task, status);

  const id = await createTaskModel(task, status);

  return {
    task,
    status,
    _id: id,
  };
};

const getTasksService = async () => {
  const tasks = await getTasksModel();

  return tasks;
};

const updateTaskService = async (id, { task, status }) => {
  taskValidation(task, status);

  await updateTaskModel(id, { task, status });

  const updatedTask = await getTaskModel(id);

  return updatedTask;
};

const deleteTaskService = async (id) => {
  await deleteTaskModel(id);
}

module.exports = {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
};
