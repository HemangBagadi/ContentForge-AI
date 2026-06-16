import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(
    AuthContext
  );

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [message, setMessage] =
    useState("");

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value
    });

  };

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    try {

      const response =
        await api.post(
          "/login",
          formData
        );

      login(
        response.data.access_token
      );

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Login failed"
      );

    }

  };

  return (
    <div>

      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default LoginPage;