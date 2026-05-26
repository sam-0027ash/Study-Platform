import {
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../services/api";

function Downloads() {

  const [downloads, setDownloads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("latest");

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchDownloads();

  }, []);

  const fetchDownloads =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(
            "/resources/downloads/history"
          );

        setDownloads(
          response.data || []
        );

      } catch (error) {

        console.log(error);

        setError(

          error.response?.data
            ?.message ||

          "Failed to load downloads"

        );

      } finally {

        setLoading(false);

      }

    };

  /* FILTER + SORT */
  const filteredDownloads =
    useMemo(() => {

      return [...downloads]

        .filter((resource) => {

          const searchValue =
            search.toLowerCase();

          return (

            resource.title
              ?.toLowerCase()
              .includes(searchValue)

            ||

            resource.subject
              ?.toLowerCase()
              .includes(searchValue)

            ||

            resource.description
              ?.toLowerCase()
              .includes(searchValue)

          );

        })

        .sort((a, b) => {

          if (
            sortOrder === "latest"
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
            sortOrder === "oldest"
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
            sortOrder ===
            "downloads"
          ) {

            return (

              (b.downloads || 0) -

              (a.downloads || 0)

            );

          }

          return 0;

        });

    }, [
      downloads,
      search,
      sortOrder,
    ]);

  /* OPEN RESOURCE */
  const handleOpen =
    async (
      resourceId,
      file,
      fileType
    ) => {

      try {

        await API.put(
          `/resources/download/${resourceId}`
        );

        /* PDF PREVIEW */
        if (
          fileType ===
          "application/pdf"
        ) {

          const previewUrl =
            file.replace(
              "/upload/",
              "/upload/fl_attachment:false/"
            );

          window.open(
            previewUrl,
            "_blank"
          );

          return;

        }

        /* OTHER FILES */
        window.open(
          file,
          "_blank"
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Failed to open resource"

        );

      }

    };

  /* TOTAL DOWNLOADS */
  const totalDownloads =
    downloads.reduce(

      (total, item) =>

        total +
        (item.downloads || 0),

      0

    );

  /* TOTAL SUBJECTS */
  const totalSubjects = [

    ...new Set(

      downloads.map(
        (item) =>
          item.subject
      )

    ),

  ].length;

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-100">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-blue-600">

            Loading Downloads...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 p-6 md:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 md:p-10 shadow-2xl mb-10">

        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              Download History 📥

            </h1>

            <p className="text-lg text-blue-100 max-w-2xl leading-8">

              Revisit all your previously downloaded study resources anytime.

            </p>

          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl px-8 py-6 text-center shadow-lg">

            <h2 className="text-5xl font-bold">

              {downloads.length}

            </h2>

            <p className="text-blue-100 mt-2">

              Saved Resources

            </p>

          </div>

        </div>

      </div>

      {/* ERROR */}
      {error && (

        <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-8">

          {error}

        </div>

      )}

      {/* SEARCH + SORT */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="Search downloaded resources..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="flex-1 border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="text-5xl mb-4">
            📥
          </div>

          <h2 className="text-4xl font-bold text-blue-600">

            {downloads.length}

          </h2>

          <p className="text-gray-600 mt-3">

            Total Resources

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
            📚
          </div>

          <h2 className="text-4xl font-bold text-purple-600">

            {totalSubjects}

          </h2>

          <p className="text-gray-600 mt-3">

            Subjects Explored

          </p>

        </div>

      </div>

      {/* EMPTY STATE */}
      {filteredDownloads.length === 0 ? (

        <div className="bg-white rounded-3xl p-16 text-center shadow-lg">

          <div className="text-7xl mb-6">
            📂
          </div>

          <h2 className="text-3xl font-bold mb-4">

            No Downloads Found

          </h2>

          <p className="text-gray-600 text-lg leading-8 max-w-xl mx-auto">

            Try changing your search keyword or explore more resources.

          </p>

        </div>

      ) : (

        <>

          {/* DOWNLOAD CARDS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredDownloads.map(
              (resource) => (

                <div
                  key={resource._id}
                  className="bg-white rounded-3xl shadow-xl p-6 border hover:shadow-2xl transition duration-300"
                >

                  <div className="flex justify-between items-start mb-5 gap-4">

                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-xl text-sm font-semibold">

                      {resource.subject}

                    </span>

                    <span className="text-sm text-gray-500 whitespace-nowrap">

                      {resource.downloads || 0} Downloads

                    </span>

                  </div>

                  <h2 className="text-2xl font-bold mb-4 leading-snug">

                    {resource.title}

                  </h2>

                  <p className="text-gray-600 mb-6 leading-7 text-sm line-clamp-4">

                    {resource.description}

                  </p>

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">

                      {resource.uploadedBy?.name?.charAt(0) || "U"}

                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">

                        {resource.uploadedBy?.name}

                      </p>

                      <p className="text-sm text-gray-500">

                        Resource Contributor

                      </p>

                    </div>

                  </div>

                  <p className="text-sm text-gray-500 mb-6">

                    Downloaded on{" "}

                    {new Date(
                      resource.createdAt
                    ).toLocaleDateString()}

                  </p>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        handleOpen(
                          resource._id,
                          resource.file,
                          resource.fileType
                        )
                      }
                      className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
                    >

                      Open

                    </button>

                    <a
                      href={resource.file}
                      download
                      className="flex-1 text-center bg-green-600 text-white py-3 rounded-2xl font-semibold hover:bg-green-700 transition"
                    >

                      Download

                    </a>

                  </div>

                </div>

              )
            )}

          </div>

          {/* FOOTER */}
          <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-4">

              About Download History

            </h2>

            <p className="text-gray-600 leading-8">

              Your download history helps you quickly revisit important study materials without searching for them again.

            </p>

          </div>

        </>

      )}

    </div>

  );

}

export default Downloads;