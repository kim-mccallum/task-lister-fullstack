import React from "react";

import "./Tasks.css";
import Card from "../UI/Card";
import TaskItem from "./TaskItem";

function Tasks(props) {
  const hasNoTasks = !props.tasks || props.tasks.length === 0;

  return (
    <section id="tasks">
      <Card>
        <h2>Your Task List</h2>
        {hasNoTasks && <h2>No tasks found. Start adding some!</h2>}
        <ul>
          {props.tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              name={task.name}
              complete={task.complete}
              onDelete={props.onDeleteTask}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default Tasks;
