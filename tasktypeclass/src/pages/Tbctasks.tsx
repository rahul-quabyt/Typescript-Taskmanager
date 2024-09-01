import { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";
import Inputdata from "../components/Home/Inputdata";
import { Task } from '../components/Home/types';

const Tbctasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputDiv, setInputDiv] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        const incompleteTasks = data.filter((task) => task.status === "Incomplete");
        setTasks(incompleteTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (newTask: Task) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        setInputDiv(false);
        setCurrentTask(null);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const updateTask = (updatedTask: Task) => {
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

  const deleteTask = (id: string) => {
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
      status: task.status === "Incomplete" ? "Completed" : "Incomplete",
    };

    updateTask(updatedTask);

    if (updatedTask.status === "Completed") {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } else {
      setTasks((prevTasks) => [...prevTasks, updatedTask]);
    }
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
    <div className="text-2xl font-bold mb-4">
      <h2>Tasks to be Completed</h2>
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
          addTask={addTask}
          updateTask={updateTask}
          currentTask={currentTask}
        />
      )}
    </div>
  );
};

export default Tbctasks;
