import { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";
import Inputdata from "../components/Home/Inputdata";
import { Task } from '../components/Home/types';

const Imptasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputDiv, setInputDiv] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        const importantTasks = data.filter((task) => task.isImportant);
        setTasks(importantTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = (id: string): void => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (task: Task): void => {
    setCurrentTask(task);
    setInputDiv(true);
  };

  const updateTask = (updatedTask: Task): void => {
    fetch(`http://localhost:5000/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((task: Task) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? task : t))
        );
        setInputDiv(false);
        setCurrentTask(null);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const toggleStatus = (task: Task): void => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Incomplete" ? "Completed" : "Incomplete",
    };

    updateTask(updatedTask);
  };

  const toggleImportant = (id: string): void => {
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      const updatedTaskWithImportance: Task = {
        ...updatedTask,
        isImportant: !updatedTask.isImportant,
      };

      fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskWithImportance),
      })
        .then((response) => response.json())
        .then((updatedTask: Task) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? updatedTask : task
            )
          );
        })
        .catch((error) => console.error("Error updating task importance:", error));
    }
  };

  return (
    <div className="text-2xl font-bold mb-4">
      <h2>Important Tasks</h2>
      <div className="mt-4">
        <Cards
          tasks={tasks}
          deleteTask={deleteTask}
          handleEdit={handleEdit}
          toggleStatus={toggleStatus}
          toggleImportant={toggleImportant}
        />
      </div>
      {inputDiv && currentTask && (
        <Inputdata
          inputDiv={inputDiv}
          setInputDiv={setInputDiv}
          addTask={() => {}} // Empty functions if not needed
          updateTask={updateTask}
          currentTask={currentTask}
        />
      )}
    </div>
  );
};

export default Imptasks;
