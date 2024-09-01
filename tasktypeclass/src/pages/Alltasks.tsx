import { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import Inputdata from "../components/Home/Inputdata";
import { Task } from '../components/Home/types'; 

const Alltasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputDiv, setInputDiv] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => setTasks(data))
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

  const toggleStatus = (task: Task) => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Incomplete" ? "Completed" : "Incomplete",
    };

    updateTask(updatedTask);
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

  const completedTasksCount: number = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const toBeCompletedTasksCount: number = tasks.filter(
    (task) => task.status === "Incomplete"
  ).length;
  const importantTasksCount: number = tasks.filter((task) => task.isImportant).length;

  return (
    <>
      <div className="text-2xl font-bold mb">
        Task Status
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="bg-green-500 text-white p-4 rounded shadow">
            <div className="text-xl font-bold">Completed Tasks</div>
            <div className="text-4xl font-semibold">{completedTasksCount}</div>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <div className="text-xl font-bold">To Be Completed</div>
            <div className="text-4xl font-semibold">
              {toBeCompletedTasksCount}
            </div>
          </div>
          <div className="bg-red-500 text-white p-4 rounded shadow">
            <div className="text-xl font-bold">Important Tasks</div>
            <div className="text-4xl font-semibold">{importantTasksCount}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold mb">All Tasks</div>
          <div className="flex justify-end px-4 py-2">
            <button onClick={() => setInputDiv(true)}>
              <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
            </button>
          </div>
        </div>
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
    </>
  );
};

export default Alltasks;
