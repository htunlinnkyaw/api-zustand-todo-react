import CreateForm from "./components/CreateForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <section className="max-w-md mx-auto mt-5">
      <CreateForm />
      <TaskList />
    </section>
  );
};

export default App;
