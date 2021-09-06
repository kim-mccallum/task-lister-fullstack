import React, { useState } from "react";

import "./TaskInput.css";
import Card from "../UI/Card";

function TaskInput(props) {
  const [enteredTaskName, setEnteredTaskName] = useState("");

  function updateTaskNameHandler(event) {
    setEnteredTaskName(event.target.value);
  }

  function taskSubmitHandler(event) {
    event.preventDefault();

    if (enteredTaskName.trim().length === 0) {
      alert("Invalid task - please enter a longer more descriptive name!");
      return;
    }

    props.onAddTask(enteredTaskName);

    setEnteredTaskName("");
  }

  return (
    <section id="task-input">
      <Card>
        <form onSubmit={taskSubmitHandler}>
          <label htmlFor="text">New Task</label>
          <input
            type="text"
            id="text"
            value={enteredTaskName}
            onChange={updateTaskNameHandler}
          />
          <button>Add Task</button>
        </form>
      </Card>
    </section>
  );
}

export default TaskInput;
