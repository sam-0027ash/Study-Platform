import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../services/api";

function MyUploads() {

  const [uploads, setUploads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [deletingId, setDeletingId] =
    useState(null);

  useEffect(() => {

    fetchUploads();

  }, []);

  const fetchUploads = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(
          "/resources/my-uploads"
        );

      setUploads(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to load uploads"
      );

    } finally {

      setLoading(false);

    }

  };

  /* OPEN FILE */
  const handleOpen = (
    file
  ) => {

    /* PDFs OPEN INLINE */
    if (
      file.includes(".pdf")
    ) {

      window.open(
        file,
        "_blank"
      );

      return;

    }

    /* OTHER FILES DOWNLOAD */
    window.open(
      file,
      "_blank"
    );

  };

  /* DELETE RESOURCE */
  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this resource?"
      );

    if (!confirmDelete) return;

    try {

      setDeletingId(id);

      await API.delete(
        `/resources/${id}`
      );

      setUploads((prev) =>

        prev.filter(
          (item) =>
            item._id !== id
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

    } finally {

      setDeletingId(null);

    }

  };

  /* TOTAL DOWNLOADS */
  const totalDownloads =
    uploads.reduce(

      (total, item) =>

        total +
        (item.downloads || 0),

      0

    );

  /* TOTAL STORAGE */
  const totalStorage =
    uploads.reduce(

      (total, item) =>

        total +
        (item.fileSize || 0),

      0

    );

  /* TOTAL SUBJECTS */
  const totalSubjects =
    [
      ...new Set(
        uploads.map(
          (item) =>
            item.subject
        )
      ),
    ].length;

  /* FORMAT FILE SIZE */
  const formatBytes = (
    bytes
  ) => {

    if (!bytes)
      return "0 MB";

    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`;

  };

  /* FILTER + SORT */
  const filteredUploads =
    useMemo(() => {

      return [...uploads]

        .filter((resource) => {

          const text =
            search.toLowerCase();

          return (

            resource.title
              ?.toLowerCase()
              .includes(text)

            ||

            resource.subject
              ?.toLowerCase()
              .includes(text)

            ||

            resource.description
              ?.toLowerCase()
              .includes(text)

          );

        })

        .sort((a, b) => {

          if (
            sortBy === "latest"
          ) {

            return (

              new Date(
                b.createdAt
              ) -

              new Date(
                a.createdAt
              )

            );

          }

          if (
            sortBy === "oldest"
          ) {

            return (

              new Date(
                a.createdAt
              ) -

              new Date(
                b.createdAt
              )

            );

          }

          if (
            sortBy ===
            "downloads"
          ) {

            return (

              (b.downloads ||
                0) -

              (a.downloads ||
                0)

            );

          }

          return 0;

        });

    }, [
      uploads,
      search,
      sortBy,
    ]);

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-purple-600">

            Loading Uploads...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-3xl p-8 md:p-10 shadow-2xl mb-10">

        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              My Uploads 📂

            </h1>

            <p className="text-lg text-purple-100 leading-8 max-w-2xl">

              Manage, organize, and
              track all the educational
              resources you have
              uploaded to StudyShare.

            </p>

          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl px-8 py-6 text-center">

            <h2 className="text-5xl font-bold">

              {uploads.length}

            </h2>

            <p className="text-purple-100 mt-2">

              Uploaded Files

            </p>

          </div>

        </div>

      </div>

      {/* EMPTY STATE */}
      {uploads.length === 0 ? (

        <div className="bg-white rounded-3xl p-16 text-center shadow-lg">

          <div className="text-7xl mb-6">
            📂
          </div>

          <h2 className="text-3xl font-bold mb-4">

            No Uploads Yet

          </h2>

          <p className="text-gray-600 text-lg leading-8 max-w-xl mx-auto mb-8">

            Start uploading notes,
            assignments, presentations,
            and study materials to
            share with students.

          </p>

          <Link
            to="/upload"
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-purple-700 transition"
          >

            Upload Resource

          </Link>

        </div>

      ) : (

        <>

          {/* SEARCH + FILTER */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

            <div className="flex flex-col lg:flex-row gap-4 justify-between">

              <input
                type="text"
                placeholder="Search uploads..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full lg:w-96 border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex flex-col sm:flex-row gap-4">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >

                  <option value="latest">
                    Latest
                  </option>

                  <option value="oldest">
                    Oldest
                  </option>

                  <option value="downloads">
                    Most Downloaded
                  </option>

                </select>

                <div className="bg-purple-50 text-purple-700 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center">

                  {filteredUploads.length}
                  {" "}
                  Results

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

              <div className="text-5xl mb-4">
                📚
              </div>

              <h2 className="text-4xl font-bold text-blue-600">

                {uploads.length}

              </h2>

              <p className="text-gray-600 mt-3">

                Total Uploads

              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

              <div className="text-5xl mb-4">
                ⬇️
              </div>

              <h2 className="text-4xl font-bold text-green-600">

                {totalDownloads}

              </h2>

              <p className="text-gray-600 mt-3">

                Total Downloads

              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

              <div className="text-5xl mb-4">
                💾
              </div>

              <h2 className="text-3xl font-bold text-purple-600">

                {formatBytes(
                  totalStorage
                )}

              </h2>

              <p className="text-gray-600 mt-3">

                Storage Used

              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

              <div className="text-5xl mb-4">
                📖
              </div>

              <h2 className="text-4xl font-bold text-orange-600">

                {totalSubjects}

              </h2>

              <p className="text-gray-600 mt-3">

                Subjects Uploaded

              </p>

            </div>

          </div>

          {/* RESOURCE CARDS */}
          {filteredUploads.length === 0 ? (

            <div className="bg-white rounded-3xl p-16 text-center shadow-lg">

              <div className="text-7xl mb-6">
                🔍
              </div>

              <h2 className="text-3xl font-bold mb-4">

                No Matching Uploads

              </h2>

              <p className="text-gray-600 text-lg">

                Try changing your
                search keywords.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredUploads.map(
                (resource) => (

                  <div
                    key={
                      resource._id
                    }
                    className="bg-white rounded-3xl shadow-xl p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                  >

                    {/* SUBJECT */}
                    <div className="flex justify-between items-center mb-4">

                      <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-xl text-sm font-semibold">

                        {
                          resource.subject
                        }

                      </span>

                      <span className="text-sm text-gray-500">

                        {
                          resource.downloads ||
                          0
                        }
                        {" "}
                        Downloads

                      </span>

                    </div>

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold mb-4 leading-snug">

                      {resource.title}

                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 leading-7 text-sm mb-6 line-clamp-4">

                      {
                        resource.description
                      }

                    </p>

                    {/* FILE INFO */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">

                      <div className="flex justify-between mb-3">

                        <span className="text-gray-500 text-sm">

                          File Size

                        </span>

                        <span className="font-semibold text-sm">

                          {formatBytes(
                            resource.fileSize
                          )}

                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-gray-500 text-sm">

                          Uploaded

                        </span>

                        <span className="font-semibold text-sm">

                          {new Date(
                            resource.createdAt
                          ).toLocaleDateString()}

                        </span>

                      </div>

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          handleOpen(
                            resource.file
                          )
                        }
                        className="bg-blue-600 text-white text-center py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
                      >

                        Open

                      </button>

                      <a
                        href={resource.file}
                        download
                        className="bg-green-600 text-white text-center py-3 rounded-2xl font-semibold hover:bg-green-700 transition"
                      >

                        Download

                      </a>

                      {/* EDIT BUTTON */}
                      <Link
                        to={`/edit-resource/${resource._id}`}
                        className="bg-yellow-500 text-white text-center py-3 rounded-2xl font-semibold hover:bg-yellow-600 transition"
                      >

                        Edit

                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            resource._id
                          )
                        }
                        disabled={
                          deletingId ===
                          resource._id
                        }
                        className="bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition disabled:opacity-60"
                      >

                        {deletingId ===
                        resource._id
                          ? "Deleting..."
                          : "Delete"}

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

          {/* FOOTER */}
          <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-4">

              About My Uploads

            </h2>

            <p className="text-gray-600 leading-8">

              This section helps you
              manage all uploaded
              resources. You can open,
              download, edit, search,
              sort, and delete files
              anytime while tracking
              your resource performance.

            </p>

          </div>

        </>

      )}

    </div>

  );

}

export default MyUploads;