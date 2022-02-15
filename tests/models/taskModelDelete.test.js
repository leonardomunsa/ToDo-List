const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection.test');

const TaskModel = require('../../models/taskModel');

describe('Delete a task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('todolist').collection('todolist').drop();
    MongoClient.connect.restore();
  });

  describe('when the task is deleted', () => {
    before(async () => {
      await connectionMock.db('todolist').collection('todolist').insertOne({
        task: 'Read a book',
        status: 'active',
      });
    });

    it('the return of getting a task should be null', async () => {
      const allTasks = await TaskModel.getTasksModel();

      const [taskCreated] = allTasks;
      const id = taskCreated._id.toHexString();

      await TaskModel.deleteTaskModel(id);
      
      const response = await TaskModel.getTaskModel(id);

      expect(response).to.be.eq(null);
    });
  });
});
