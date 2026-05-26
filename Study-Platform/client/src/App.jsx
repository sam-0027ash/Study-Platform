import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import EditResource from "./pages/EditResource";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyUploads from "./pages/MyUploads";
import Downloads from "./pages/Downloads";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const token =
    localStorage.getItem("token");

  const storedUser =
    localStorage.getItem("user");

  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;

  console.log(user);

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Home />
            )
          }
        />

        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Signup />
            )
          }
        />

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* EDIT RESOURCE ROUTE */}
        <Route
          path="/edit-resource/:id"
          element={
            <ProtectedRoute>
              <EditResource />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/downloads"
          element={
            <ProtectedRoute>
              <Downloads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-uploads"
          element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN ROUTE
        ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>

              {user &&
              user.role ===
                "admin" ? (

                <Admin />

              ) : (

                <Navigate
                  to="/dashboard"
                  replace
                />

              )}

            </ProtectedRoute>
          }
        />

        {/* =========================
            404 PAGE
        ========================= */}

        <Route
          path="*"
          element={

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">

              <h1 className="text-7xl font-bold text-blue-600 mb-4">

                404

              </h1>

              <h2 className="text-3xl font-bold mb-4">

                Page Not Found

              </h2>

              <p className="text-gray-600 text-lg mb-8 text-center">

                The page you are
                looking for does not
                exist.

              </p>

              <a
                href="/"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
              >

                Go Back Home

              </a>

            </div>

          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;