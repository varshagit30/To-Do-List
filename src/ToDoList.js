import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiArrowUpThick } from "react-icons/ti";
import { TiArrowDownThick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    "Do laundry",
    "Walk the dog",
    "Clean the room",
  ]);
  const [newTask, setNewTask] = useState("");
  const [checked, setChecked] = useState([]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.length > 0) {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const notifyTop = () => toast.error("This task is already at the top!");
  const notifyBottom = () => toast.error("This task is already at the bottom!");

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else notifyTop();
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else notifyBottom();
  };

  const handleCheckBoxChange = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

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
              value={task}
              checked={checked.includes(task)}
              onChange={handleCheckBoxChange}
            />
          </label>
          <span className={isChecked(task)}>{task}</span>
          <FaRegTrashAlt
            className="delBtn"
            onClick={() => deleteTask(index)}
            title="Delete"
          />
          <TiArrowUpThick
            className="upBtn"
            onClick={() => moveTaskUp(index)}
            title="Move Task Up"
          />
          <TiArrowDownThick
            className="downBtn"
            onClick={() => moveTaskDown(index)}
            title="Move Task Down"
          />
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

export default ToDoList;
