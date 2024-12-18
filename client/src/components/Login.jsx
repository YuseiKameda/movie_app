import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.error || "login failure");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-8 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            ログイン
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-px">
            <label className="text-gray-100">メールアドレス</label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                  border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none
                  focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800 pl-10"
                placeholder="mail"
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm space-y-px">
            <label className="text-gray-100">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border
              border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none
              focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800 pl-10"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
