import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useRef,
  useEffect,
} from "react";

const BACKEND_URL =
  import.meta.env.VITE_API_URL?.replace(
    "/api",
    ""
  );

function Navbar() {

  const location =
    useLocation();

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const isAdmin =
    user?.role === "admin";

  const [
    dropdownOpen,
    setDropdownOpen,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const dropdownRef =
    useRef();

  /* CLOSE DROPDOWN */
  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {

        setDropdownOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  /* LOGOUT */
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";

  };

  /* ACTIVE LINK STYLE */
  const activeLink =
    "text-blue-600 font-semibold";

  const normalLink =
    "text-gray-700 hover:text-blue-600 font-medium transition";

  return (

    <nav className="bg-white/95 backdrop-blur-md shadow-md px-4 md:px-8 py-4 sticky top-0 z-50 border-b">

      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div>

          <Link
            to={
              token
                ? "/dashboard"
                : "/"
            }
            className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-tight"
          >

            StudyShare

          </Link>

        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {!token ? (

            <>

              <Link
                to="/"
                className={
                  location.pathname ===
                  "/"
                    ? activeLink
                    : normalLink
                }
              >

                Home

              </Link>

              <Link
                to="/about"
                className={
                  location.pathname ===
                  "/about"
                    ? activeLink
                    : normalLink
                }
              >

                About

              </Link>

              <Link
                to="/contact"
                className={
                  location.pathname ===
                  "/contact"
                    ? activeLink
                    : normalLink
                }
              >

                Contact

              </Link>

            </>

          ) : (

            <>

              <Link
                to="/dashboard"
                className={
                  location.pathname ===
                  "/dashboard"
                    ? activeLink
                    : normalLink
                }
              >

                Dashboard

              </Link>

              <Link
                to="/browse"
                className={
                  location.pathname ===
                  "/browse"
                    ? activeLink
                    : normalLink
                }
              >

                Browse

              </Link>

              <Link
                to="/upload"
                className={
                  location.pathname ===
                  "/upload"
                    ? activeLink
                    : normalLink
                }
              >

                Upload

              </Link>

              {isAdmin && (

                <Link
                  to="/admin"
                  className={
                    location.pathname ===
                    "/admin"
                      ? activeLink
                      : normalLink
                  }
                >

                  Admin

                </Link>

              )}

            </>

          )}

          {/* USER MENU */}
          <div
            className="relative"
            ref={dropdownRef}
          >

            <button
              onClick={() =>
                setDropdownOpen(
                  !dropdownOpen
                )
              }
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-2xl transition shadow-sm"
            >

              {user?.profileImage ? (

                <img
                  src={`${BACKEND_URL}/${user.profileImage}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />

              ) : (

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center uppercase">

                  {user?.name
                    ? user.name.charAt(
                        0
                      )
                    : "☰"}

                </div>

              )}

              {token && (

                <div className="hidden lg:block text-left">

                  <p className="text-sm font-semibold text-gray-800">

                    {user?.name ||
                      "User"}

                  </p>

                  <p className="text-xs text-gray-500">

                    {isAdmin
                      ? "Administrator"
                      : "Student"}

                  </p>

                </div>

              )}

            </button>

            {dropdownOpen && (

              <div className="absolute right-0 mt-4 w-72 max-w-[90vw] bg-white rounded-3xl shadow-2xl border overflow-hidden animate-fadeIn">

                {token ? (

                  <>

                    {/* USER INFO */}
                    <div className="px-5 py-5 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center gap-4">

                      {user?.profileImage ? (

                        <img
                          src={`${BACKEND_URL}/${user.profileImage}`}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border-4 border-white"
                        />

                      ) : (

                        <div className="w-16 h-16 rounded-full bg-white text-blue-700 flex items-center justify-center text-2xl font-bold uppercase border-4 border-white">

                          {user?.name
                            ? user.name.charAt(
                                0
                              )
                            : "U"}

                        </div>

                      )}

                      <div>

                        <h3 className="font-bold text-lg md:text-xl">

                          {user?.name ||
                            "StudyShare User"}

                        </h3>

                        <p className="text-sm text-blue-100 break-all">

                          {user?.email}

                        </p>

                      </div>

                    </div>

                    {/* LINKS */}
                    <Link
                      to="/profile"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      Profile

                    </Link>

                    <Link
                      to="/downloads"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      Downloads

                    </Link>

                    <Link
                      to="/my-uploads"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      My Uploads

                    </Link>

                    <Link
                      to="/browse"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      Explore Resources

                    </Link>

                    {isAdmin && (

                      <Link
                        to="/admin"
                        onClick={() =>
                          setDropdownOpen(
                            false
                          )
                        }
                        className="block px-5 py-3 hover:bg-gray-100 transition text-red-600 font-semibold"
                      >

                        Admin Panel

                      </Link>

                    )}

                    <button
                      onClick={
                        handleLogout
                      }
                      className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition border-t font-medium"
                    >

                      Logout

                    </button>

                  </>

                ) : (

                  <>

                    {/* GUEST MENU */}
                    <div className="px-5 py-5 border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

                      <h3 className="font-bold text-xl">

                        Welcome 👋

                      </h3>

                      <p className="text-sm text-blue-100 mt-1">

                        Access your
                        study platform

                      </p>

                    </div>

                    <Link
                      to="/login"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      Login

                    </Link>

                    <Link
                      to="/signup"
                      onClick={() =>
                        setDropdownOpen(
                          false
                        )
                      }
                      className="block px-5 py-3 hover:bg-gray-100 transition"
                    >

                      Create Account

                    </Link>

                  </>

                )}

              </div>

            )}

          </div>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className="md:hidden text-3xl text-blue-600"
        >

          ☰

        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (

        <div className="md:hidden mt-4 bg-white rounded-3xl shadow-lg border p-4 flex flex-col gap-4 animate-fadeIn">

          {!token ? (

            <>

              <Link
                to="/"
                className={normalLink}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={normalLink}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={normalLink}
              >
                Contact
              </Link>

              <Link
                to="/login"
                className={normalLink}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={normalLink}
              >
                Signup
              </Link>

            </>

          ) : (

            <>

              <Link
                to="/dashboard"
                className={normalLink}
              >
                Dashboard
              </Link>

              <Link
                to="/browse"
                className={normalLink}
              >
                Browse
              </Link>

              <Link
                to="/upload"
                className={normalLink}
              >
                Upload
              </Link>

              <Link
                to="/profile"
                className={normalLink}
              >
                Profile
              </Link>

              <Link
                to="/downloads"
                className={normalLink}
              >
                Downloads
              </Link>

              <Link
                to="/my-uploads"
                className={normalLink}
              >
                My Uploads
              </Link>

              {isAdmin && (

                <Link
                  to="/admin"
                  className="text-red-600 font-semibold"
                >
                  Admin Panel
                </Link>

              )}

              <button
                onClick={
                  handleLogout
                }
                className="text-left text-red-600 font-semibold"
              >
                Logout
              </button>

            </>

          )}

        </div>

      )}

      {/* ANIMATION */}
      <style>

        {`
          .animate-fadeIn {
            animation: fadeIn 0.2s ease;
          }

          @keyframes fadeIn {

            from {
              opacity: 0;
              transform: translateY(-10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }

          }
        `}

      </style>

    </nav>

  );

}

export default Navbar;