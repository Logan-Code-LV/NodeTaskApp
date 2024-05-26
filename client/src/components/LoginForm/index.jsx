import React, { useState } from "react";
import "./styles.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.post("http://localhost:3005/users/login", {
    //     email,
    //     password,
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Failed to login", error);
    // }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
