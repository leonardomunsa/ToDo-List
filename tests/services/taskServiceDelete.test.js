const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('../models/mongoMockConnection.test');

const TaskService = require('../../services/taskService');

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

    it('the return of getting all the tasks should be empty', async () => {
      const allTasks = await TaskService.getTasksService();

      const [taskCreated] = allTasks;
      const id = taskCreated._id.toHexString();

      await TaskService.deleteTaskService(id);

      const allTasksAfterDelete = await TaskService.getTasksService();

      expect(allTasksAfterDelete).to.be.a('array').to.be.empty;
    });
  });
});
