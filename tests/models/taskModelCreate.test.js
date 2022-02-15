const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection.test');

const TaskModel = require('../../models/taskModel');

describe('Insert a new task', () => {
  let connectionMock;

  const payloadTask = {
    task: 'Finish project',
    status: 'Active',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('todolist').collection('todolist').drop();
    MongoClient.connect.restore();
  });

  describe('when it is done successfully', () => {
    it('returns an object', async () => {
      const response = await TaskModel.createTaskModel(payloadTask);

      expect(response).to.be.a('object');
    });

    it('the object has a property id', async () => {
      const response = await TaskModel.createTaskModel(payloadTask);

      expect(response).to.have.a.property('id');
    });

    it('should exists the task created', async () => {
      await TaskModel.createTaskModel(payloadTask);
      const taskCreated = await connectionMock.db('todolist').collection('todolist').findOne({ task: payloadTask.task });
      expect(taskCreated).to.be.not.null;
    });
  });
});
