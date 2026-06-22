import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(
    AuthContext
  );

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      navigate(
        "/dashboard"
      );

    }

  }, [navigate]);

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

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-xl
          shadow-lg
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          ContentForge AI
        </h1>

        <p
          className="
            text-center
            text-gray-500
            mb-6
          "
        >
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              p-3
              mb-4
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              p-3
              mb-4
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              p-3
              rounded-lg
              hover:bg-blue-700
            "
          >
            Login
          </button>

        </form>

        {message && (

          <p
            className="
              text-red-500
              mt-4
              text-center
            "
          >
            {message}
          </p>

        )}

        <p
          className="
            text-center
            mt-6
          "
        >
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="
              text-blue-600
              font-semibold
            "
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>

  );

}

export default LoginPage;