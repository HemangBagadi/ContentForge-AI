import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";

function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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

      await api.post(
        "/signup",
        formData
      );

      navigate("/");

    } catch (error) {

      setMessage(
        error.response?.data?.detail ||
        "Signup failed"
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
          Create your account
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
              bg-green-600
              text-white
              p-3
              rounded-lg
              hover:bg-green-700
            "
          >
            Create Account
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
          Already have an account?{" "}

          <Link
            to="/"
            className="
              text-blue-600
              font-semibold
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default SignupPage;