const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createTaskModel = async ({task, status}) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('todolist')
    .insertOne({ task, status });

  return insertedId;
};

const getTasksModel = async () => {
  const db = await connection();
  const tasks = await db.collection('todolist').find().toArray();

  return tasks;
};

const getTaskModel = async (id) => {
  const db = await connection();
  const task = await db.collection('todolist').findOne({ _id: new ObjectId(id) });

  return task;
};

const updateTaskModel = async (id, toDo) => {
  const db = await connection();
  const updatedTask = await db
    .collection('todolist')
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...toDo } });

  return updatedTask;
};

const deleteTaskModel = async (id) => {
  const db = await connection();
  await db.collection('todolist').deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createTaskModel,
  getTasksModel,
  getTaskModel,
  updateTaskModel,
  deleteTaskModel,
};
