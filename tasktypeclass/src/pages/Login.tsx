import { useState, FC, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import { useAuth0 } from "@auth0/auth0-react";

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0(); 

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/users?email=${email}&password=${password}`);
      const users: any[] = await response.json();

      if (users.length > 0) {
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-full max-w-md rounded bg-gray-700'>
        <div className='text-2xl font-semibold text-white mb-4'>Login</div>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            id="email"  
            placeholder="Email" 
            className="bg-gray-800 px-3 py-2 my-3 w-full rounded text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            id="password"  
            placeholder="Password" 
            className="bg-gray-800 px-3 py-2 my-3 w-full rounded text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='bg-purple-500 text-xl font-semibold px-3 py-2 rounded text-white w-full mt-4'>
            Login
          </button>
          <button 
          onClick={() => loginWithRedirect()} 
          className='bg-blue-500 text-xl font-semibold px-3 py-2 rounded text-white w-full mt-4'>
            Login with Google
          </button>
          <Link to="/signup" className="text-purple-300 mt-4 block text-center">Not a member yet? Signup!</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;