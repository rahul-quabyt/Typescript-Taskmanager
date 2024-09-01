import { FC } from "react";
import Sidebar from "../components/Home/Sidebar";
import { Routes, Route } from "react-router-dom";
import Alltasks from "./Alltasks";
import Imptasks from "./Imptasks";
import Comptasks from "./Comptasks";
import Tbctasks from "./Tbctasks";

const Home: FC = () => {
  return (
    <div className="flex min-h-screen gap-4 p-4">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl p-4">
        <Routes>
          <Route path="/" element={<Alltasks />} />
          <Route path="/Imptasks" element={<Imptasks />} />
          <Route path="/Comptasks" element={<Comptasks />} />
          <Route path="/Tbctasks" element={<Tbctasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;