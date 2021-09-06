import React from "react";

import "./TaskItem.css";

function TaskItem(props) {
  const deleteTaskHandler = (taskId) => {
    // console.log(`deleting task with id: ${taskId}`);
    props.onDelete(taskId);
  };

  return (
    <li className="task-item">
      {/* {props.name} */}
      <p className={props.complete ? "complete" : ""}>{props.name}</p>
      {/* <button onClick={props.onDelete.bind(null, props.id)}>Delete</button> */}
      <button
        className="delete-button"
        onClick={() => deleteTaskHandler(props.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
