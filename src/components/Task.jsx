import React, { useState } from "react";
import useTaskStore from "../store/useTaskStore";
import { orbit } from "ldrs";
import { square } from "ldrs";

const Task = ({ task: { id, task, isDone } }) => {
  const { removeTask, doneTask } = useTaskStore();
  const [removeLoader, setRemoveLoader] = useState(false);
  const [doneLoader, setDoneLoader] = useState(false);

  // Registering components once
  React.useEffect(() => {
    orbit.register();
    square.register();
  }, []);

  const handleRemoveTask = async () => {
    setRemoveLoader(true);
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        removeTask(id);
      }
    } catch (error) {
      console.error("Error removing task:", error);
    } finally {
      setRemoveLoader(false);
    }
  };

  const handleDoneTask = async () => {
    setDoneLoader(true);
    try {
      // Simulate an async operation; replace with real logic as needed
      await new Promise((resolve) => setTimeout(resolve, 1000));
      doneTask(id, isDone); // Toggle the task's done state
    } catch (error) {
      console.error("Error marking task as done:", error);
    } finally {
      setDoneLoader(false);
    }
  };

  return (
    <div className="flex justify-between items-center border border-gray-400 px-4 py-3 rounded-md">
      <div className="flex gap-3 items-center">
        {doneLoader && (
          <l-square
            size="15"
            stroke="2"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="1.2"
            color="black"
          ></l-square>
        )}

        <input
          type="checkbox"
          checked={isDone}
          onChange={handleDoneTask}
          className={`w-4 h-4 ${doneLoader ? "hidden" : "block"}`}
          disabled={doneLoader}
        />

        <p
          className={`text-gray-600 font-mono ${isDone ? "line-through" : ""}`}
        >
          {task}
        </p>
      </div>
      <button
        onClick={handleRemoveTask}
        className="font-mono text-sm border w-[70px] border-gray-600 px-2 py-1 rounded-md"
        disabled={removeLoader} // Disable button while loader is active
      >
        {removeLoader ? (
          <l-orbit size="20" speed="1.5" color="black"></l-orbit>
        ) : (
          <span>Delete</span>
        )}
      </button>
    </div>
  );
};

export default Task;
