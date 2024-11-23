import React, { useEffect, useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleTask(event) {
    setNewTask(event.target.value);
  }

  function persistData(newList) {
    localStorage.setItem("tasks", JSON.stringify(newList));
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      persistData(updatedTasks);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    persistData(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      persistData(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      persistData(updatedTasks);
    }
  }

  useEffect(() => {
    try {
      const localTodos = localStorage.getItem("tasks");
      if (localTodos) {
        const parsedTodos = JSON.parse(localTodos);
        if (Array.isArray(parsedTodos)) {
          setTasks(parsedTodos); // Only set state if it's an array
        } else {
          console.error("Invalid tasks format in localStorage, resetting.");
          localStorage.removeItem("tasks"); // Clear invalid data
          setTasks([]); // Reset to an empty array
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage tasks:", error);
      setTasks([]); // Fallback to an empty array on error
    }
  }, []);
  

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter Your Task..."
        value={newTask}
        onChange={handleTask}
      />
      <button className="add-task" onClick={addTask}>
        Add
      </button>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="Text">{task}</span>
            <button className="delete-task" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-up" onClick={() => moveTaskUp(index)}>
              👆
            </button>
            <button className="move-down" onClick={() => moveTaskDown(index)}>
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
