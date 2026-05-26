import { useEffect, useState } from "react";
import API from "../services/api";

function Browse() {

  const [resources, setResources] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    subjectFilter,
    setSubjectFilter,
  ] = useState("All");

  const [sortOrder, setSortOrder] =
    useState("latest");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchResources();

  }, []);

  const fetchResources =
    async () => {

      try {

        const response =
          await API.get(
            "/resources"
          );

        setResources(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  /* DOWNLOAD + TRACK */
  const handleDownload =
    async (
      resourceId,
      fileUrl
    ) => {

      try {

        await API.put(
          `/resources/download/${resourceId}`
        );

        /* UPDATE DOWNLOAD COUNT LIVE */
        setResources(
          (prevResources) =>
            prevResources.map(
              (resource) =>
                resource._id ===
                resourceId
                  ? {
                      ...resource,

                      downloads:
                        (resource.downloads ||
                          0) + 1,
                    }
                  : resource
            )
        );

        window.open(
          fileUrl,
          "_blank"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to download resource"
        );

      }

    };

  /* OPEN FILE */
  const handleOpen =
    async (
      resourceId,
      fileUrl
    ) => {

      try {

        await API.put(
          `/resources/download/${resourceId}`
        );

        /* UPDATE DOWNLOAD COUNT LIVE */
        setResources(
          (prevResources) =>
            prevResources.map(
              (resource) =>
                resource._id ===
                resourceId
                  ? {
                      ...resource,

                      downloads:
                        (resource.downloads ||
                          0) + 1,
                    }
                  : resource
            )
        );

        window.open(
          fileUrl,
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

  /* UNIQUE SUBJECTS */
  const subjects = [

    "All",

    ...new Set(
      resources.map(
        (resource) =>
          resource.subject
      )
    ),

  ];

  /* FILTER + SEARCH + SORT */
  const filteredResources =
    resources

      .filter((resource) => {

        const matchesSearch =

          resource.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          resource.subject
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          resource.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesSubject =

          subjectFilter ===
            "All" ||

          resource.subject ===
            subjectFilter;

        return (
          matchesSearch &&
          matchesSubject
        );

      })

      .sort((a, b) => {

        if (
          sortOrder ===
          "latest"
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
          sortOrder ===
          "oldest"
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
            (b.downloads ||
              0) -
            (a.downloads ||
              0)
          );

        }

        return 0;

      });

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

        <div className="text-center">

          <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">

            Loading Resources...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-8 sm:mb-10">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">

          Browse Resources

        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-blue-100 leading-7">

          Discover notes, PDFs,
          assignments, and study
          materials shared by
          students.

        </p>

      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 mb-8 sm:mb-10">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by title, subject, or description..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          {/* SUBJECT FILTER */}
          <select
            value={subjectFilter}
            onChange={(e) =>
              setSubjectFilter(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 sm:p-4 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >

            {subjects.map(
              (
                subject,
                index
              ) => (

                <option
                  key={index}
                  value={
                    subject
                  }
                >

                  {subject}

                </option>

              )
            )}

          </select>

          {/* SORT */}
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
            className="border border-gray-300 p-3 sm:p-4 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
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

      {/* EMPTY STATE */}
      {filteredResources.length ===
      0 ? (

        <div className="bg-white rounded-2xl sm:rounded-3xl p-10 sm:p-16 text-center shadow-lg">

          <div className="text-6xl sm:text-7xl mb-6">

            📚

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">

            No Resources Found

          </h2>

          <p className="text-gray-600 text-sm sm:text-lg leading-7">

            Try changing your
            search keywords or
            filters.

          </p>

        </div>

      ) : (

        /* RESOURCE CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

          {filteredResources.map(
            (resource) => {

              const fileUrl =
                resource.file;

              return (

                <div
                  key={
                    resource._id
                  }
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-7 border hover:shadow-2xl transition"
                >

                  {/* SUBJECT + DOWNLOADS */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">

                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-xl text-xs sm:text-sm font-semibold">

                      {
                        resource.subject
                      }

                    </span>

                    <span className="text-xs sm:text-sm text-gray-500">

                      {resource.downloads ||
                        0}
                      {" "}
                      Downloads

                    </span>

                  </div>

                  {/* TITLE */}
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">

                    {
                      resource.title
                    }

                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm sm:text-base leading-7 mb-6">

                    {
                      resource.description
                    }

                  </p>

                  {/* UPLOADED BY */}
                  <div className="mb-4">

                    <p className="text-xs sm:text-sm text-gray-500">

                      Uploaded By

                    </p>

                    <p className="font-semibold text-gray-800 break-words">

                      {
                        resource
                          .uploadedBy
                          ?.name
                      }

                    </p>

                  </div>

                  {/* DATE */}
                  <p className="text-xs sm:text-sm text-gray-500 mb-6">

                    Uploaded on{" "}

                    {new Date(
                      resource.createdAt
                    ).toLocaleDateString()}

                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                    {/* OPEN */}
                    <button
                      onClick={() =>
                        handleOpen(
                          resource._id,
                          fileUrl
                        )
                      }
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl sm:rounded-2xl font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
                    >

                      Open

                    </button>

                    {/* DOWNLOAD */}
                    <button
                      onClick={() =>
                        handleDownload(
                          resource._id,
                          fileUrl
                        )
                      }
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl sm:rounded-2xl font-semibold hover:bg-green-700 transition text-sm sm:text-base"
                    >

                      Download

                    </button>

                  </div>

                </div>

              );

            }
          )}

        </div>

      )}

    </div>

  );

}

export default Browse;