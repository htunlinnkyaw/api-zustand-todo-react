import React, { useEffect, useState } from "react";
import Task from "./Task";
import useTaskStore from "../store/useTaskStore";
import Loader from "./Loader";

const TaskList = () => {
  const { task, setTask } = useTaskStore();
  const [loading, setLoading] = useState(false);

  const handleFetchTask = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setTask(data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchTask();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center my-3">
        <span className="bg-zinc-500 text-white px-3 py-1 text-sm rounded-lg">
          Tasks
        </span>
        <span className="bg-zinc-500 text-white px-3 text-sm py-1 rounded-lg">
          Total {task.length} | Done{" "}
          {task.filter((el) => el.isDone === true).length}
        </span>
      </div>
      <div className="mt-5 space-y-2">
        {loading && <Loader />}
        {task.map((el) => (
          <Task key={el.id} task={el} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
