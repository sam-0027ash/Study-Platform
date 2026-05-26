import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function Admin() {

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalResources: 0,
      totalDownloads: 0,
    });

  const [users, setUsers] =
    useState([]);

  const [resources, setResources] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchUser, setSearchUser] =
    useState("");

  const [searchResource,
    setSearchResource] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("users");

  useEffect(() => {

    fetchAdminData();

  }, []);

  const fetchAdminData =
    async () => {

      try {

        const [
          statsRes,
          usersRes,
          resourcesRes,
        ] = await Promise.all([

          API.get("/admin/stats"),

          API.get("/admin/users"),

          API.get("/admin/resources"),

        ]);

        setStats(
          statsRes.data
        );

        setUsers(
          usersRes.data
        );

        setResources(
          resourcesRes.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  /* DELETE USER */
  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete) return;

      try {

        await API.delete(
          `/admin/user/${id}`
        );

        setUsers((prev) =>
          prev.filter(
            (user) =>
              user._id !== id
          )
        );

        alert(
          "User deleted successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to delete user"
        );

      }

    };

  /* DELETE RESOURCE */
  const deleteResource =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this resource?"
        );

      if (!confirmDelete) return;

      try {

        await API.delete(
          `/resources/${id}`
        );

        setResources((prev) =>
          prev.filter(
            (resource) =>
              resource._id !== id
          )
        );

        alert(
          "Resource deleted successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to delete resource"
        );

      }

    };

  /* FILTER USERS */
  const filteredUsers =
    users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(
          searchUser.toLowerCase()
        )

      ||

      user.email
        .toLowerCase()
        .includes(
          searchUser.toLowerCase()
        )

    );

  /* FILTER RESOURCES */
  const filteredResources =
    resources.filter((resource) =>

      resource.title
        .toLowerCase()
        .includes(
          searchResource.toLowerCase()
        )

      ||

      resource.subject
        .toLowerCase()
        .includes(
          searchResource.toLowerCase()
        )

    );

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-100 via-white to-pink-100">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-red-600">

            Loading Admin Panel...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-3xl p-8 md:p-10 shadow-2xl mb-10">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              Admin Dashboard 👑

            </h1>

            <p className="text-lg text-red-100 leading-8 max-w-2xl">

              Manage platform users,
              uploaded resources,
              and monitor overall
              platform activity.

            </p>

          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl px-8 py-6 text-center">

            <h2 className="text-5xl font-bold">

              {stats.totalUsers}

            </h2>

            <p className="text-red-100 mt-2">

              Active Users

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            📚
          </div>

          <h2 className="text-5xl font-bold text-red-600">

            {stats.totalResources}

          </h2>

          <p className="text-gray-600 mt-3">

            Total Resources

          </p>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            👥
          </div>

          <h2 className="text-5xl font-bold text-blue-600">

            {stats.totalUsers}

          </h2>

          <p className="text-gray-600 mt-3">

            Total Users

          </p>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            ⬇️
          </div>

          <h2 className="text-5xl font-bold text-green-600">

            {stats.totalDownloads}

          </h2>

          <p className="text-gray-600 mt-3">

            Total Downloads

          </p>

        </div>

      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8">

        <button
          onClick={() =>
            setActiveTab("users")
          }
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            activeTab === "users"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >

          Users

        </button>

        <button
          onClick={() =>
            setActiveTab("resources")
          }
          className={`px-6 py-3 rounded-2xl font-semibold transition ${
            activeTab === "resources"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >

          Resources

        </button>

      </div>

      {/* USERS SECTION */}
      {activeTab === "users" && (

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-10">

          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">

            <h2 className="text-4xl font-bold">

              Users

            </h2>

            <input
              type="text"
              placeholder="Search users..."
              value={searchUser}
              onChange={(e) =>
                setSearchUser(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Name
                  </th>

                  <th className="text-left py-4">
                    Email
                  </th>

                  <th className="text-left py-4">
                    Role
                  </th>

                  <th className="text-left py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map(
                  (user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-5 font-semibold">

                        {user.name}

                      </td>

                      <td className="py-5">

                        {user.email}

                      </td>

                      <td className="py-5 capitalize">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm font-semibold">

                          {user.role}

                        </span>

                      </td>

                      <td className="py-5">

                        <button
                          onClick={() =>
                            deleteUser(
                              user._id
                            )
                          }
                          className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* RESOURCES SECTION */}
      {activeTab === "resources" && (

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">

            <h2 className="text-4xl font-bold">

              Resources

            </h2>

            <input
              type="text"
              placeholder="Search resources..."
              value={searchResource}
              onChange={(e) =>
                setSearchResource(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredResources.map(
              (resource) => (

                <div
                  key={
                    resource._id
                  }
                  className="bg-gray-50 rounded-3xl p-6 border hover:shadow-2xl transition"
                >

                  <div className="flex justify-between items-center mb-4">

                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-xl text-sm font-semibold">

                      {
                        resource.subject
                      }

                    </span>

                    <span className="text-sm text-gray-500">

                      {
                        resource.downloads || 0
                      }
                      {" "}
                      Downloads

                    </span>

                  </div>

                  <h3 className="text-2xl font-bold mb-4">

                    {
                      resource.title
                    }

                  </h3>

                  <p className="text-gray-600 leading-7 mb-5 line-clamp-4">

                    {
                      resource.description
                    }

                  </p>

                  <div className="bg-white rounded-2xl p-4 mb-6">

                    <p className="text-sm text-gray-500 mb-2">

                      Uploaded By

                    </p>

                    <p className="font-semibold">

                      {
                        resource
                          .uploadedBy
                          ?.name
                      }

                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <a
                      href={resource.file}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white text-center py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
                    >

                      Open

                    </a>

                    <button
                      onClick={() =>
                        deleteResource(
                          resource._id
                        )
                      }
                      className="bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default Admin;