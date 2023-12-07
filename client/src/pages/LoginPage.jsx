import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fix the typo here
    try {
      await axios.post("/login", { email, password });
      alert("Login Successful");
    } catch (e) {
      alert("Login Failed");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={"example@example.com"}
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?
            <br />
            <Link className="text-black underline" to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
