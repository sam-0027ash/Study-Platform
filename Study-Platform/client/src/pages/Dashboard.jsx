import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const [myUploads, setMyUploads] =
    useState([]);

  const [allResources, setAllResources] =
    useState([]);

  const [
    downloadHistory,
    setDownloadHistory,
  ] = useState([]);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        // USER PROFILE
        const profileResponse =
          await API.get(
            "/auth/profile"
          );

        // MY UPLOADS
        const uploadsResponse =
          await API.get(
            "/resources/my-uploads"
          );

        // ALL RESOURCES
        const resourcesResponse =
          await API.get(
            "/resources"
          );

        // DOWNLOAD HISTORY
        const downloadsResponse =
          await API.get(
            "/resources/downloads/history"
          );

        setUser(
          profileResponse.data
        );

        setMyUploads(
          uploadsResponse.data
        );

        setAllResources(
          resourcesResponse.data
        );

        setDownloadHistory(
          downloadsResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  /* POPULAR RESOURCES */
  const popularResources =
    [...allResources]

      .sort(
        (a, b) =>
          (b.downloads || 0) -
          (a.downloads || 0)
      )

      .slice(0, 3);

  /* RECENT RESOURCES */
  const recentResources =
    [...allResources].slice(0, 4);

  /* TOTAL DOWNLOADS */
  const totalDownloads =
    myUploads.reduce(
      (total, item) =>
        total +
        (item.downloads || 0),
      0
    );

  /* TOTAL STORAGE */
  const totalStorage =
    myUploads.reduce(
      (total, item) =>
        total +
        (item.fileSize || 0),
      0
    );

  /* FORMAT STORAGE */
  const formatBytes = (
    bytes
  ) => {

    if (!bytes)
      return "0 MB";

    return (
      (
        bytes /
        (1024 * 1024)
      ).toFixed(2) + " MB"
    );

  };

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

        <div className="text-center">

          <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">

            Loading Dashboard...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl mb-8 sm:mb-10">

        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">

          <div className="text-center lg:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">

              Welcome Back,
              {" "}
              {user?.name || "User"} 👋

            </h1>

            <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-7 sm:leading-8 max-w-2xl">

              Continue uploading,
              exploring, and sharing
              educational resources
              with students around
              the world.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

              <Link to="/upload">

                <button className="w-full sm:w-auto bg-white text-blue-700 px-6 py-3 rounded-xl sm:rounded-2xl font-semibold hover:scale-105 transition">

                  Upload Resource

                </button>

              </Link>

              <Link to="/browse">

                <button className="w-full sm:w-auto bg-black/20 border border-white px-6 py-3 rounded-xl sm:rounded-2xl font-semibold hover:bg-black/30 transition">

                  Explore Resources

                </button>

              </Link>

            </div>

          </div>

          {/* USER AVATAR */}
          <div className="flex flex-col items-center">

            {user?.profileImage ? (

              <img
                src={user.profileImage}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl"
              />

            ) : (

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-xl">

                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}

              </div>

            )}

            <p className="mt-4 text-blue-100 font-medium text-sm sm:text-base text-center break-all">

              {user?.email}

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-6 mb-10 sm:mb-12">

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-4xl sm:text-5xl mb-4">
            📚
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">

            {myUploads.length}

          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">

            My Uploads

          </p>

        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-4xl sm:text-5xl mb-4">
            🌍
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-green-600">

            {allResources.length}

          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">

            Total Resources

          </p>

        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-4xl sm:text-5xl mb-4">
            ⬇️
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-purple-600">

            {totalDownloads}

          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">

            Total Downloads

          </p>

        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-4xl sm:text-5xl mb-4">
            🧾
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-orange-600">

            {downloadHistory.length}

          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">

            Download History

          </p>

        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-4xl sm:text-5xl mb-4">
            💾
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-red-600 break-words">

            {formatBytes(
              totalStorage
            )}

          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">

            Storage Used

          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl mb-10 sm:mb-12">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

          <div className="text-center md:text-left">

            <h2 className="text-2xl sm:text-3xl font-bold mb-2">

              Quick Actions

            </h2>

            <p className="text-gray-600 text-sm sm:text-base">

              Easily manage your
              learning resources.

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">

          <Link to="/upload">

            <div className="bg-blue-50 hover:bg-blue-100 transition rounded-2xl sm:rounded-3xl p-6 cursor-pointer">

              <div className="text-4xl mb-4">
                ⬆️
              </div>

              <h3 className="text-xl font-bold mb-2">

                Upload

              </h3>

              <p className="text-gray-600 text-sm leading-6">

                Share notes, PDFs,
                and study guides.

              </p>

            </div>

          </Link>

          <Link to="/browse">

            <div className="bg-green-50 hover:bg-green-100 transition rounded-2xl sm:rounded-3xl p-6 cursor-pointer">

              <div className="text-4xl mb-4">
                🔍
              </div>

              <h3 className="text-xl font-bold mb-2">

                Browse

              </h3>

              <p className="text-gray-600 text-sm leading-6">

                Discover educational
                resources.

              </p>

            </div>

          </Link>

          <Link to="/my-uploads">

            <div className="bg-purple-50 hover:bg-purple-100 transition rounded-2xl sm:rounded-3xl p-6 cursor-pointer">

              <div className="text-4xl mb-4">
                📂
              </div>

              <h3 className="text-xl font-bold mb-2">

                My Uploads

              </h3>

              <p className="text-gray-600 text-sm leading-6">

                Manage uploaded
                resources.

              </p>

            </div>

          </Link>

          <Link to="/downloads">

            <div className="bg-red-50 hover:bg-red-100 transition rounded-2xl sm:rounded-3xl p-6 cursor-pointer">

              <div className="text-4xl mb-4">
                📥
              </div>

              <h3 className="text-xl font-bold mb-2">

                Downloads

              </h3>

              <p className="text-gray-600 text-sm leading-6">

                View your download
                history.

              </p>

            </div>

          </Link>

        </div>

      </div>

      {/* RECENT RESOURCES */}
      <div className="mb-12 sm:mb-14">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

          <h2 className="text-2xl sm:text-3xl font-bold">

            Recent Resources

          </h2>

          <Link
            to="/browse"
            className="text-blue-600 font-semibold hover:underline"
          >

            View All

          </Link>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {recentResources.map(
            (resource) => (

              <div
                key={resource._id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition"
              >

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">

                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-xl text-sm font-semibold">

                    {resource.subject}

                  </span>

                  <span className="text-sm text-gray-500">

                    {resource.downloads || 0}
                    {" "}
                    Downloads

                  </span>

                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-snug">

                  {resource.title}

                </h3>

                <p className="text-gray-600 text-sm sm:text-base leading-7 mb-6">

                  {resource.description}

                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  <span className="text-sm text-gray-500 break-words">

                    By{" "}
                    {
                      resource.uploadedBy
                        ?.name
                    }

                  </span>

                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition text-sm"
                  >

                    Open

                  </a>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* POPULAR RESOURCES */}
      <div>

        <div className="mb-8">

          <h2 className="text-2xl sm:text-3xl font-bold">

            Most Popular Resources

          </h2>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {popularResources.map(
            (resource) => (

              <div
                key={resource._id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg border hover:shadow-2xl transition"
              >

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">

                  <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-xl text-sm font-semibold">

                    {resource.subject}

                  </span>

                  <span className="text-sm text-gray-500">

                    ⭐{" "}
                    {resource.downloads || 0}

                  </span>

                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-snug">

                  {resource.title}

                </h3>

                <p className="text-gray-600 text-sm sm:text-base leading-7 mb-6">

                  {resource.description}

                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  <span className="text-sm text-gray-500 break-words">

                    By{" "}
                    {
                      resource.uploadedBy
                        ?.name
                    }

                  </span>

                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition text-sm"
                  >

                    Open

                  </a>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );

}

export default Dashboard;