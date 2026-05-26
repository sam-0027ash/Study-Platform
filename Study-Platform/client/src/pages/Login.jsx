import { useState } from "react";

import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await API.post(
          "/auth/login",
          formData
        );

      /* SAVE TOKEN */
      localStorage.setItem(
        "token",
        response.data.token
      );

      /* SAVE USER */
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      alert(
        `Welcome back ${response.data.user.name}!`
      );

      /* REDIRECT */
      const redirectPath =
        location.state?.from ||
        "/dashboard";

      navigate(redirectPath);

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data
          ?.message ||

        "Login failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">

      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden">

        {/* TOP SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 sm:px-10 py-8 sm:py-12 text-center">

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">

            Welcome Back 👋

          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-6 sm:leading-7">

            Login to continue exploring,
            uploading, and sharing
            educational resources with
            students around the world.

          </p>

        </div>

        {/* FORM */}
        <div className="p-6 sm:p-10">

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5 sm:space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base hover:bg-blue-700 transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >

              {loading
                ? "Logging In..."
                : "Login"}

            </button>

          </form>

          {/* FOOTER */}
          <div className="text-center mt-6 sm:mt-8">

            <p className="text-gray-600 mb-2 text-sm sm:text-base">

              Don’t have an account?

            </p>

            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline text-sm sm:text-base"
            >

              Create Account

            </Link>

          </div>

          {/* EXTRA INFO */}
          <div className="mt-8 sm:mt-10 bg-blue-50 rounded-2xl p-4 sm:p-5">

            <h3 className="font-bold text-blue-700 mb-3 text-sm sm:text-base">

              Why Join StudyShare?

            </h3>

            <ul className="text-xs sm:text-sm text-gray-600 space-y-2 leading-5 sm:leading-6">

              <li>
                • Upload and organize
                study materials
              </li>

              <li>
                • Explore resources
                from other students
              </li>

              <li>
                • Access notes,
                assignments, and PDFs
              </li>

              <li>
                • Build your personal
                learning collection
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;