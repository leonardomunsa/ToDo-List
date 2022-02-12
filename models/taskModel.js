const connection = require('./connection');

const createTaskModel = async (task, status) => {
  const db = await connection();
  const { insertedId } = await db.collection('todolist').insertOne({ task, status });

  return insertedId;
}

module.exports = {
  createTaskModel,
}
