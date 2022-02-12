const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const { createTaskController } = require('./controllers/taskController');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.post('/task', createTaskController);

app.use(errorHandler);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
