const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection.test');

const TaskModel = require('../../models/taskModel');

describe('Get all the tasks from db', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('todolist').collection('todolist').drop();
    MongoClient.connect.restore();
  });

  describe('when there is no tasks in db', () => {
    before(async () => {
      await connectionMock.db('todolist').collection('todolist').deleteMany({});
    });

    it('returns an array', async () => {
      const response = await TaskModel.getTasksModel();

      expect(response).to.be.a('array');
    });

    it('the array is empty', async () => {
      const response = await TaskModel.getTasksModel();

      expect(response).to.be.empty;
    });
  });

  describe('when there is tasks in db', () => {
    before(async () => {
      await connectionMock.db('todolist').collection('todolist').insertOne({
        task: 'Finish project',
        status: 'Active',
      });
    });

    it('returns an array', async () => {
      const response = await TaskModel.getTasksModel();

      expect(response).to.be.a('array');
    });

    it('the array is not empty', async () => {
      const response = await TaskModel.getTasksModel();

      expect(response).to.be.not.empty;
    });

    it('sould exists the tasks created', async () => {
      const response = await TaskModel.getTasksModel();

      const [taskCreated] = response;
      
      expect(taskCreated.task).to.be.eq('Finish project');
    });
  });
});
