import { FC } from 'react';
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import Imptasks from './pages/Imptasks';
import Comptasks from './pages/Comptasks';
import Tbctasks from './pages/Tbctasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Alltasks />} />
            <Route path="Imptasks" element={<Imptasks />} />
            <Route path="Comptasks" element={<Comptasks />} />
            <Route path="Tbctasks" element={<Tbctasks />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;