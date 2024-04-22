import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowDownThick } from "react-icons/ti";

import "./index.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState(["Do laundry", "Walk the dog", "Clean the room"]);
  const [newTask, setNewTask] = useState("");
  const [done, setDone] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.length > 0) {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
      setDone(false);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    console.log(index);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else alert("This task is already at the top! ");
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else alert("This task is already at the bottom! ");
  };

  const handleCheckBoxChange = (index) => {
    setDone(true);
  };

  return (
    <>
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Enter the task..."
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button className="addBtn" onClick={addTask}>
        Add
      </button>
      <br />
      {tasks.map((task, index) => (
        <div className="toDoList">
          <label>
            <input
              className="checkBox"
              type="checkbox"
              key={index}
              // checked={done}
              // onChange={handleCheckBoxChange}
            />
          </label>
          {/* {console.log("task:   ", task)}
              {console.log("ind:   ", index.done)} */}
          <span
            className="taskText"
            // style={done ? { textDecoration: "line-through" } : null}
          >
            {task}
          </span>
          <FaRegTrashAlt
            className="delBtn"
            onClick={() => deleteTask(index)}
            title="Delete"
          />
          <TiArrowUpThick
            className="upBtn"
            onClick={() => moveTaskUp(index)}
            title="Move Up"
          />
          <TiArrowDownThick
            className="downBtn"
            onClick={() => moveTaskDown(index)}
            title="Move Down"
          />
        </div>
      ))}
    </>
  );
};

export default ToDoList;
