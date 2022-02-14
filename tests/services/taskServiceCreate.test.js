const sinon = require('sinon');
const { expect } = require('chai');

const TaskModel = require('../../models/taskModel');
const TaskService = require('../../services/taskService');

describe('Inserts a new task', () => {
  describe('when the payload is not valid', () => {
    const payloadTaskWrong = {
      task: 15,
    };

    it('sould throw an error object', async () => {
      try {
        await TaskService.createTaskService(payloadTaskWrong);
      } catch (error) {
        expect(error).to.be.a('object');
      }
    });

    it('the error object should contain the property status equal to 400', async () => {
      try {
        await TaskService.createTaskService(payloadTaskWrong);
      } catch (error) {
        expect(error).to.be.have.property('status').equal(400);
      }
    });

    it('the error object should contain the message expected', async () => {
      try {
        await TaskService.createTaskService(payloadTaskWrong);
      } catch (error) {
        expect(error.message).to.be.equal('Must have task and status and both must be strings');
      }
    });
  });

  describe('when the payload is valid', () => {
    const payloadTask = {
      task: 'Eat meal',
      status: 'pending',
    };

    it('sould return a object', async () => {
      const response = await TaskService.createTaskService(payloadTask.task, payloadTask.status);

      expect(response).to.be.a('object');
    });

    it('the object should contain the task "Eat meal"', async () => {
      const response = await TaskService.createTaskService(payloadTask.task, payloadTask.status);

      expect(response).to.have.property('task').to.eq('Eat meal');
    });
  });
});
