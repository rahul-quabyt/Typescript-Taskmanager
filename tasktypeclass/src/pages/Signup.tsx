import { useState, FC, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Signup: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleSignup = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-full max-w-md rounded bg-gray-700">
        <div className="text-2xl font-semibold text-white mb-4">Sign Up</div>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-800 px-3 py-2 my-3 w-full rounded text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-800 px-3 py-2 my-3 w-full rounded text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 px-3 py-2 my-3 w-full rounded text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-xl font-semibold px-3 py-2 rounded text-white w-full mt-4"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-xl font-semibold px-3 py-2 rounded text-white w-full mt-4"
        >
          Sign Up with Google
        </button>
        <Link to="/login" className="text-purple-300 mt-4 block text-center">
          Already a member? Login!
        </Link>
      </div>
    </div>
  );
};

export default Signup;