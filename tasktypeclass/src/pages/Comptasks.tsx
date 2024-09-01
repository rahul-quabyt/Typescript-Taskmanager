import { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";
import Inputdata from "../components/Home/Inputdata";
import { Task } from '../components/Home/types';

const Comptasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputDiv, setInputDiv] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        const completedTasks = data.filter((task) => task.status === "Completed");
        setTasks(completedTasks);
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

  const toggleStatus = (task: Task): void => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Completed" ? "Incomplete" : "Completed",
    };

    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((updatedTask: Task) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );

        if (updatedTask.status === "Incomplete") {
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== updatedTask.id));
        }
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const toggleImportant = (id: string) => {
    const updatedTask = tasks.find(task => task.id === id);
    if (updatedTask) {
      const updatedTaskWithImportance: Task = {
        ...updatedTask,
        isImportant: !updatedTask.isImportant
      };

      fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskWithImportance),
      })
        .then((response) => response.json())
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? updatedTaskWithImportance : task
            )
          );
        })
        .catch((error) => console.error("Error updating task importance:", error));
    }
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setInputDiv(true);
  };

  return (
    <div className="text-2xl font-bold mb">
      Completed Tasks
      <div className="mt-4">
        <Cards
          tasks={tasks}
          deleteTask={deleteTask}
          handleEdit={handleEdit}
          toggleStatus={toggleStatus}
          toggleImportant={toggleImportant} 
        />
      </div>
      {inputDiv && (
        <Inputdata
          inputDiv={inputDiv}
          setInputDiv={setInputDiv}
          addTask={() => {}}
          updateTask={toggleStatus}
          currentTask={currentTask}
        />
      )}
    </div>
  );
};

export default Comptasks;
