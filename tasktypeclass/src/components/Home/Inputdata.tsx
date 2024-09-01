import { useState, useEffect, FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { Task } from "./types";

interface InputDataProps {
  inputDiv: boolean;
  setInputDiv: (value: boolean) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  currentTask?: Task;
}

const Inputdata: FC<InputDataProps> = ({ inputDiv, setInputDiv, addTask, updateTask, currentTask }) => {
  const location = useLocation();
  const creatingTask: boolean = location.state?.creatingTask || false;

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title ?? ""); 
      setDesc(currentTask.desc ?? "");   
      setIsImportant(currentTask.isImportant);
    } else if (creatingTask) {
      setTitle("");
      setDesc("");
      setIsImportant(false);
    }
  }, [currentTask, creatingTask]);

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (): void => {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const newTask: Task = {
      id: currentTask?.id ?? generateUniqueId(), 
      title,
      desc,
      status: "Incomplete",
      isImportant,
    };

    if (currentTask) {
      updateTask(newTask); 
    } else {
      addTask(newTask); 
    }
    setInputDiv(false);
  };

  return (
    <>
      {inputDiv && (
        <div className="fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full"></div>
      )}
      {inputDiv && (
        <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
          <div className="w-2/6 bg-gray-900 p-4 rounded relative">
            <button
              className="text-2xl absolute top-2 right-2 text-white"
              onClick={() => setInputDiv(false)}
            >
              <RxCross2 />
            </button>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 rounded w-full bg-gray-700 my-5 text-white"
            />
            <textarea
              name="desc"
              cols={30}
              rows={10}
              placeholder="Enter the Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white"
            ></textarea>
            <label className="flex items-center my-3 text-white">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="mr-2"
              />
              Mark as Important
            </label>
            <button
              className="px-3 py-2 bg-purple-600 rounded font-semibold text-white text-xl w-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Inputdata;
