const connection = require('./connection');

const createTaskModel = async (task, status) => {
  const db = await connection();
  const { insertedId } = await db.collection('todolist').insertOne({ task, status });

  return insertedId;
}

const getTasksModel = async () => {
  const db = await connection();
  const tasks = await db.collection('todolist').find().toArray();

  return tasks;
}

module.exports = {
  createTaskModel,
  getTasksModel,
}
