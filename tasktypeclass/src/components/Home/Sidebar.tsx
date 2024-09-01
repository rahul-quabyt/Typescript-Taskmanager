import { useState, FC } from "react";
import {
  AiFillContainer,
  AiFillFileExclamation,
  AiFillFileAdd,
  AiFillThunderbolt,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Inputdata from "./Inputdata";
import { Task } from "./types";

const Sidebar: FC = () => {
  const [inputDiv, setInputDiv] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const data = [
    {
      title: "All Tasks",
      icon: <AiFillContainer />,
      link: "/",
    },
    {
      title: "Important",
      icon: <AiFillFileExclamation />,
      link: "/Imptasks",
    },
    {
      title: "Completed",
      icon: <AiFillFileAdd />,
      link: "/Comptasks",
    },
    {
      title: "Incompleted",
      icon: <AiFillThunderbolt />,
      link: "/Tbctasks",
    },
  ];

  const addTask = (newTask: Task): void => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div>
        <h1 className="text-xl font-semibold">Task</h1>
        <h2 className="text-xl font-semibold">Manager</h2>
        <hr className="w-full my-2" />
      </div>
      <div className="flex-grow w-full">
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300"
          >
            {item.icon} &nbsp; {item.title}
          </Link>
        ))}
      </div>

      {inputDiv && (
        <Inputdata
          inputDiv={inputDiv}
          setInputDiv={setInputDiv}
          addTask={addTask}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

export default Sidebar;
