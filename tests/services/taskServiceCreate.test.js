const sinon = require('sinon');
const { expect } = require('chai');

const TaskModel = require('../../models/taskModel');
const TaskService = require('../../services/taskService');

describe('Inserts a new task', () => {
  describe('when the payload is not valid', () => {
    const payloadTask = {
      task: 15,
    };

    it('sould throw an error object', async () => {
      try {
        await TaskService.createTaskService(payloadTask);
      } catch (error) {
        expect(error).to.be.a('object');
      }
    });

    it('the error object should contain the property status equal to 400', async () => {
      try {
        await TaskService.createTaskService(payloadTask);
      } catch (error) {
        expect(error).to.be.have.property('status').equal(400);
      }
    });

    it('the error object should contain the message expected', async () => {
      try {
        await TaskService.createTaskService(payloadTask);
      } catch (error) {
        expect(error.message).to.be.equal('Must have task and status and both must be strings');
      }
    });

  });
});
