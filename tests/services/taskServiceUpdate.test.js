const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('../models/mongoMockConnection.test');

const TaskService = require('../../services/taskService');
const { badRequest } = require('../../utils/dictionary');

describe('Update a task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('todolist').collection('todolist').drop();
    MongoClient.connect.restore();
  });

  describe('when the payload is not valid', () => {
    const payloadId = '604cb554311d68f491ba5781';
    const payloadTaskWrong = {
      status: 'active',
    };

    it('sould throw an error object', async () => {
      try {
        await TaskService.updateTaskService(payloadId, payloadTaskWrong);
      } catch (error) {
        expect(error).to.be.a('object');
      }
    });

    it('the error object should contain the property status equal to 400', async () => {
      try {
        await TaskService.updateTaskService(payloadId, payloadTaskWrong);
      } catch (error) {
        expect(error).to.have.property('status').equal(badRequest);
      }
    });

    it('the error object should contain the message expected', async () => {
      try {
        await TaskService.updateTaskService(payloadId, payloadTaskWrong);
      } catch (error) {
        expect(error.message).to.be.equal('Must have task and status and both must be strings');
      }
    });
  });

  describe('when the task is updated', () => {
    const payloadUpdateTask = {
      task: 'Read a book',
      status: 'done',
    };

    before(async () => {
      await connectionMock.db('todolist').collection('todolist').insertOne({
        task: 'Read a book',
        status: 'active',
      });
    });

    it('the status of task to be updated', async () => {
      const allTasks = await TaskService.getTasksService();

      const [taskCreated] = allTasks;
      const id = taskCreated._id.toHexString();

      const response = await TaskService.updateTaskService(id, payloadUpdateTask);

      expect(response.status).to.be.eq('done');
    });
  });
});
