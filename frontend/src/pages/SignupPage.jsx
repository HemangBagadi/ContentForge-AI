import { useState } from "react";
import api from "../api/api";

function SignupPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const response = await api.post(
        "/signup",
        formData
      );

      setMessage(
        response.data.message
      );

    } catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Signup failed"
      );

    }

  };

  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

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
          Sign Up
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default SignupPage;