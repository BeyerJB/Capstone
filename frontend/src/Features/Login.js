import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({username: '', password: ''})
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
    .then(async (res) => {
      if (res.status === 200) {
        const response = await res.json();
        login(response);

        navigate('/mycalendar');
      } else {
        const errorMessage = await res.text();
        alert(`${errorMessage}`);
      }
    });
  };

  return (
    <div className="log-form">
      <h2>Login to your account</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" name="username" value={loginData.username} onChange={handleInputChange}/>
        <input type="password" placeholder="password" name="password" value={loginData.password} onChange={handleInputChange}/>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;