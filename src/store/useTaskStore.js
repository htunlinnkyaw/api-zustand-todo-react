import { create } from "zustand";

const useTaskStore = create((set) => ({
  task: [],
  setTask: (data) => set(() => ({ task: data })),
  addTask: (newTask) => set((state) => ({ task: [...state.task, newTask] })),
  removeTask: (id) =>
    set((state) => ({ task: state.task.filter((el) => el.id !== id) })),
  doneTask: async (id, currentState) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !currentState }),
    });
    const data = await res.json();
    console.log(data);

    set((state) => ({
      task: state.task.map((el) => (el.id === id ? data : el)),
    }));
  },
}));

export default useTaskStore;
