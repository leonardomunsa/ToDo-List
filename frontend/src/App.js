import React, { useState, useEffect } from "react";
const axios = require('axios');

function App() {
  const [tasks, setTasks] = useState([]);
  const [infosTask, setInfosTask] = useState({
    task: "",
    status: "pending",
  });
  const [taskId, setTaskId] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/task")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/task")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  const handleChange = ({ target: { name, value } }) => {
    setInfosTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const deleteTask = () => {
    axios.delete(`http://localhost:3000/task/${taskId}`);
  }

  const updateTask = () => {
    axios.put(`http://localhost:3000/task/${taskId}`, {
      task: infosTask.task,
      status: infosTask.status,
    })
  }

  const createTask = () => {
    axios.post("http://localhost:3000/task", {
      task: infosTask.task,
      status: infosTask.status,
    });
  };

  return (
    <div className="App">
      <dl>
        {tasks.map(({ _id, task, status }) => (
          <>
            <dt key={_id} onClick={() => setTaskId(_id) }>{task}</dt>
            <dd>- {status}</dd>
          </>
        ))}
      </dl>
      <select onChange={ handleChange } name="status">
        <option value="pending">pending</option>
        <option value="active">active</option>
        <option value="done">done</option>
      </select>
      <input onChange={ handleChange } name="task"></input>
      <button type="button" onClick={ createTask }>Add task</button>
      <button type="button" disabled={ taskId ? false : true } onClick={ deleteTask }>Delete task</button>
      <button type="button" disabled={ taskId ? false : true } onClick={ updateTask }>Update task</button>
    </div>
  );
}

export default App;
