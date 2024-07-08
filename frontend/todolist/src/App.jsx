import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/task";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isCheck, setIsCheck] = useState("Pendente");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Erro ao buscar tasks");
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const createTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: text }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      setTasks([...tasks, data]);
      setText("");
      fetchTasks();
      console.log("Sucesso:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: isCheck }),
      });
      if (isCheck === "Pendente") {
        setIsCheck("Feito");
      } else {
        setIsCheck("Pendente");
      }

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, ...data } : task))
      );
      setText("");
      fetchTasks();
      console.log("Sucesso:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar task");
      }
      setTasks(tasks.filter((task) => parseInt(task.id) !== id));
      console.log("Task deletada com sucesso");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-900 text-neutral-200 flex items-center flex-col pt-16 gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="w-full flex items-center justify-center font-medium text-3xl">
          Todo List
        </h1>
        <div className="w-full flex items-center gap-1">
          <input
            className="bg-neutral-700 w-72 h-8 outline-none pl-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva ou atualize uma tarefa"
          />
          <button
            className="bg-slate-500 size-8 flex items-center justify-center font-bold"
            onClick={createTask}
          >
            +
          </button>
        </div>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title + " - " + task.status}
          updateTask={() => updateTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default App;
