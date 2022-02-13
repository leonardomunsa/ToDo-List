const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection.test');

const TaskModel = require('../../models/taskModel');

describe('Get all the tasks from db', () => {
  let connectionMock;

  const payloadUpdateTask = {
    task: 'Read a book',
    status: 'done',
  }

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('todolist').collection('todolist').drop();
    MongoClient.connect.restore();
  });

  describe('when the task is updated', () => {
    before(async () => {
      await connectionMock.db('todolist').collection('todolist').insertOne({
        task: 'Read a book',
        status: 'active',
      });
    });

    it('the status of task to be updated', async () => {
      const allTasks = await TaskModel.getTasksModel();

      const [taskCreated] = allTasks;
      const id = taskCreated._id.toHexString();

      await TaskModel.updateTaskModel(id, payloadUpdateTask);
      
      const response = await TaskModel.getTaskModel(id);

      expect(response.status).to.be.eq('done');
    });
  });
});
