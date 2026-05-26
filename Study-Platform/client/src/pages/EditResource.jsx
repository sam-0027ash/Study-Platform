import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

function EditResource() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      subject: "",
      tags: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {

    fetchResource();

  }, []);

  const fetchResource =
    async () => {

      try {

        const response =
          await API.get(
            `/resources/${id}`
          );

        setFormData({
          title:
            response.data.title || "",
          description:
            response.data.description || "",
          subject:
            response.data.subject || "",
          tags:
            response.data.tags
              ?.join(", ") || "",
        });

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load resource"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setUpdating(true);

      setError("");

      setSuccess("");

      try {

        await API.put(
          `/resources/${id}`,
          {
            ...formData,

            tags:
              formData.tags
                .split(",")
                .map((tag) =>
                  tag.trim()
                )
                .filter(Boolean),
          }
        );

        setSuccess(
          "Resource updated successfully"
        );

        setTimeout(() => {

          navigate(
            "/my-uploads"
          );

        }, 1500);

      } catch (error) {

        console.log(error);

        setError(

          error.response?.data
            ?.message ||

          "Update failed"

        );

      } finally {

        setUpdating(false);

      }

    };

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-indigo-100">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-blue-600">

            Loading Resource...

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center px-6 py-10">

      <div className="bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-10">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">

            Edit Resource ✏️

          </h1>

          <p className="text-blue-100 leading-8 text-lg">

            Update your uploaded
            study material details
            and keep your resources
            organized for other
            students.

          </p>

        </div>

        {/* FORM */}
        <div className="p-8 md:p-10">

          {error && (

            <div className="bg-red-100 text-red-700 px-5 py-4 rounded-2xl mb-6">

              {error}

            </div>

          )}

          {success && (

            <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl mb-6">

              {success}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* TITLE */}
            <div>

              <label className="block mb-3 text-lg font-semibold text-gray-700">

                Resource Title

              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={
                  handleChange
                }
                required
                placeholder="Enter resource title"
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* SUBJECT */}
            <div>

              <label className="block mb-3 text-lg font-semibold text-gray-700">

                Subject

              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={
                  handleChange
                }
                required
                placeholder="Enter subject name"
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* TAGS */}
            <div>

              <label className="block mb-3 text-lg font-semibold text-gray-700">

                Tags

              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={
                  handleChange
                }
                placeholder="react, javascript, notes"
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-sm text-gray-500 mt-2">

                Separate tags with commas

              </p>

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block mb-3 text-lg font-semibold text-gray-700">

                Description

              </label>

              <textarea
                name="description"
                rows="7"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Write a detailed description..."
                className="w-full border border-gray-300 rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">

              <button
                type="submit"
                disabled={updating}
                className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
              >

                {updating
                  ? "Updating Resource..."
                  : "Update Resource"}

              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/my-uploads"
                  )
                }
                className="bg-gray-200 text-gray-800 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition"
              >

                Cancel

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditResource;