const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { createTaskController, getTasksController, updateTaskController, deleteTaskController } = require('./controllers/taskController');

const app = express();
app.use(cors({
  origin: '*',
}))

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/task', createTaskController);
app.get('/task', getTasksController);
app.put('/task/:id', updateTaskController);
app.delete('/task/:id', deleteTaskController);

app.use(errorHandler);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
