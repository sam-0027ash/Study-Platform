import { useEffect, useState } from "react";

import API from "../services/api";

function Profile() {

  const [user, setUser] =
    useState({
      name: "",
      email: "",
      bio: "",
      profileImage: "",
      createdAt: "",
    });

  const [stats, setStats] =
    useState({
      uploads: 0,
      downloads: 0,
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /* FETCH PROFILE */
  useEffect(() => {

    fetchProfile();

    fetchStats();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get(
          "/auth/profile"
        );

      setUser(response.data);

      setPreview(
        response.data.profileImage
          ? `${import.meta.env.VITE_API_URL.replace(
              "/api",
              ""
            )}/${response.data.profileImage}`
          : ""
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  /* FETCH STATS */
  const fetchStats = async () => {

    try {

      const uploadsResponse =
        await API.get(
          "/resources/my-uploads"
        );

      const downloadsResponse =
        await API.get(
          "/resources/downloads/history"
        );

      setStats({
        uploads:
          uploadsResponse.data.length,
        downloads:
          downloadsResponse.data.length,
      });

    } catch (error) {

      console.log(error);

    }

  };

  /* INPUT CHANGE */
  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]:
        e.target.value,
    });

  };

  /* IMAGE CHANGE */
  const handleImageChange = (
    e
  ) => {

    const selectedImage =
      e.target.files[0];

    setImage(selectedImage);

    if (selectedImage) {

      setPreview(
        URL.createObjectURL(
          selectedImage
        )
      );

    }

  };

  /* UPDATE PROFILE */
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setSaving(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "name",
        user.name
      );

      formData.append(
        "email",
        user.email
      );

      formData.append(
        "bio",
        user.bio
      );

      if (image) {

        formData.append(
          "profileImage",
          image
        );

      }

      const response =
        await API.put(
          "/auth/profile",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(
        response.data.message
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      fetchProfile();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Profile update failed"
      );

    } finally {

      setSaving(false);

    }

  };

  /* LOADING */
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">

          Loading Profile...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 py-6 md:py-8">

      <div className="max-w-6xl mx-auto">

        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-10">

          <div className="p-5 sm:p-8 md:p-10 text-white">

            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10">

              {/* PROFILE IMAGE */}
              <div className="relative flex-shrink-0">

                {preview ? (

                  <img
                    src={preview}
                    alt="Profile"
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                  />

                ) : (

                  <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold border-4 border-white shadow-2xl">

                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>

                )}

              </div>

              {/* USER DETAILS */}
              <div className="text-center lg:text-left flex-1 w-full">

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 break-words">

                  {user.name}

                </h1>

                <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-4 break-all">

                  {user.email}

                </p>

                <p className="text-blue-200 leading-7 text-sm sm:text-base max-w-2xl">

                  {user.bio
                    ? user.bio
                    : "No bio added yet. Update your profile to tell others more about yourself."}

                </p>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

                  <div className="bg-white/20 backdrop-blur-md px-5 py-4 rounded-2xl">

                    <p className="text-sm text-blue-100">

                      Uploads

                    </p>

                    <p className="text-2xl font-bold">

                      {
                        stats.uploads
                      }

                    </p>

                  </div>

                  <div className="bg-white/20 backdrop-blur-md px-5 py-4 rounded-2xl">

                    <p className="text-sm text-blue-100">

                      Downloads

                    </p>

                    <p className="text-2xl font-bold">

                      {
                        stats.downloads
                      }

                    </p>

                  </div>

                  <div className="bg-white/20 backdrop-blur-md px-5 py-4 rounded-2xl sm:col-span-2 lg:col-span-1">

                    <p className="text-sm text-blue-100">

                      Member Since

                    </p>

                    <p className="font-semibold text-sm sm:text-base">

                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-US",
                            {
                              year:
                                "numeric",
                              month:
                                "long",
                            }
                          )
                        : "2026"}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EDIT PROFILE */}
        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10">

          <div className="mb-8 sm:mb-10">

            <h2 className="text-3xl sm:text-4xl font-bold mb-3">

              Edit Profile

            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-7 sm:leading-8">

              Update your account
              information, bio, and
              profile image to
              personalize your
              StudyShare account.

            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6 sm:space-y-8"
          >

            {/* NAME */}
            <div>

              <label className="block text-base sm:text-lg font-semibold mb-3">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={
                  handleChange
                }
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-base sm:text-lg font-semibold mb-3">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={
                  handleChange
                }
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* BIO */}
            <div>

              <label className="block text-base sm:text-lg font-semibold mb-3">

                Bio

              </label>

              <textarea
                rows="5"
                name="bio"
                value={user.bio}
                onChange={
                  handleChange
                }
                placeholder="Write something about yourself..."
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>

            {/* IMAGE */}
            <div>

              <label className="block text-base sm:text-lg font-semibold mb-3">

                Profile Image

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 bg-gray-50 text-sm sm:text-base"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
            >

              {saving
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Profile;