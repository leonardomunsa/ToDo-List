const { badRequest } = require('./dictionary')
const errorHandling = require('./errorHandling')

module.exports = (task, status) => {
  if (!task || !status || typeof task !== 'string' || typeof status !== 'string') {
    throw errorHandling(badRequest, 'Must have task and status and both must be strings');
  }
}
