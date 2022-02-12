const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const { createTaskController, getTasksController } = require('./controllers/taskController');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.post('/task', createTaskController);
app.get('/task', getTasksController);

app.use(errorHandler);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
