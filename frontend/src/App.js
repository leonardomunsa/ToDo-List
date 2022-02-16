import React, { useState, useEffect } from "react";
const axios = require('axios');

function App() {
  const [tasks, setTasks] = useState([]);
  const [infosTask, setInfosTask] = useState({
    task: "",
    status: "pending",
  });

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
            <dt key={_id}>{task}</dt>
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
    </div>
  );
}

export default App;
