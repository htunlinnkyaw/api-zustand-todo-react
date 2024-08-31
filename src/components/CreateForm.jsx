import React, { useRef, useState } from "react";
import useTaskStore from "../store/useTaskStore";
import { tailspin } from "ldrs";

const CreateForm = () => {
  const [loader, setLoader] = useState(false);
  const { addTask } = useTaskStore();

  tailspin.register();

  const inputRef = useRef();

  const handleAddTask = async () => {
    const newTask = {
      task: inputRef.current.value,
      isDone: false,
    };
    setLoader(true);
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    addTask(data);
    setLoader(false);
    inputRef.current.value = null;
  };

  return (
    <>
      <h1 className="my-3 font-serif text-xl">To Do List</h1>
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Create a Task..."
          className="border border-r-0 flex-grow px-4 py-2 rounded-lg rounded-e-none  border-black outline-none"
        />
        <button
          onClick={handleAddTask}
          className="border hover:bg-gray-400  text-black hover:text-white rounded-lg rounded-s-none border-black bg-gray-300 px-4 py-2"
        >
          {loader ? (
            <l-tailspin
              size="20"
              stroke="5"
              speed="0.9"
              color="white"
            ></l-tailspin>
          ) : (
            <span>Add</span>
          )}
        </button>
      </div>
    </>
  );
};

export default CreateForm;
