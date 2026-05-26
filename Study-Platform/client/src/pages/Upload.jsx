import { useState } from "react";
import API from "../services/api";

function Upload() {

  const [formData, setFormData] =
    useState({
      title: "",
      subject: "",
      description: "",
      tags: "",
    });

  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [dragActive, setDragActive] =
    useState(false);

  const [fileError, setFileError] =
    useState("");

  const MAX_FILE_SIZE =
    20 * 1024 * 1024;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/png",
    "image/jpeg",
  ];

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  /* VALIDATE FILE */
  const validateFile = (
    selectedFile
  ) => {

    if (!selectedFile)
      return false;

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {

      setFileError(
        "Unsupported file type"
      );

      return false;

    }

    if (
      selectedFile.size >
      MAX_FILE_SIZE
    ) {

      setFileError(
        "File size must be under 20MB"
      );

      return false;

    }

    setFileError("");

    return true;

  };

  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files[0];

    if (
      validateFile(selectedFile)
    ) {

      setFile(selectedFile);

    }

  };

  /* DRAG & DROP */
  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);

  };

  const handleDragLeave = () => {

    setDragActive(false);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const selectedFile =
      e.dataTransfer.files[0];

    if (
      validateFile(selectedFile)
    ) {

      setFile(selectedFile);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {

      alert(
        "Please select a valid file"
      );

      return;

    }

    try {

      setUploading(true);

      const uploadData =
        new FormData();

      uploadData.append(
        "title",
        formData.title
      );

      uploadData.append(
        "subject",
        formData.subject
      );

      uploadData.append(
        "description",
        formData.description
      );

      uploadData.append(
        "tags",
        formData.tags
      );

      uploadData.append(
        "file",
        file
      );

      const response =
        await API.post(
          "/resources/upload",
          uploadData,
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

      /* RESET */
      setFormData({
        title: "",
        subject: "",
        description: "",
        tags: "",
      });

      setFile(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Upload failed"
      );

    } finally {

      setUploading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 sm:py-10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10">

          {/* HEADER */}
          <div className="mb-8 sm:mb-10">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-4 leading-tight">

              Upload Study
              Resource 📚

            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-7 sm:leading-8">

              Share notes,
              assignments,
              presentations, PDFs,
              and study materials
              with students.

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-7"
          >

            {/* TITLE */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">

                Resource Title

              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: React Notes"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* SUBJECT */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">

                Subject

              </label>

              <input
                type="text"
                name="subject"
                placeholder="Example: Computer Science"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">

                Description

              </label>

              <textarea
                name="description"
                placeholder="Describe your resource..."
                value={
                  formData.description
                }
                onChange={handleChange}
                rows="6"
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />

            </div>

            {/* TAGS */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">

                Tags

              </label>

              <input
                type="text"
                name="tags"
                placeholder="react, javascript, frontend"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs sm:text-sm text-gray-500 mt-2">

                Separate tags with
                commas

              </p>

            </div>

            {/* FILE AREA */}
            <div>

              <label className="block text-gray-700 font-semibold mb-3 text-sm sm:text-base">

                Upload File

              </label>

              <div
                onDragOver={
                  handleDragOver
                }
                onDragLeave={
                  handleDragLeave
                }
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-6 sm:p-10 text-center transition ${
                  dragActive
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >

                <div className="text-5xl sm:text-6xl mb-5">

                  📄

                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3">

                  Drag & Drop
                  Files Here

                </h3>

                <p className="text-gray-500 mb-6 text-sm sm:text-base">

                  PDF, DOCX, TXT,
                  PNG, JPG

                </p>

                <input
                  type="file"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                  id="fileUpload"
                  required
                />

                <label
                  htmlFor="fileUpload"
                  className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-2xl font-semibold cursor-pointer hover:bg-blue-700 transition inline-block text-sm sm:text-base"
                >

                  Choose File

                </label>

                {file && (

                  <div className="mt-6 bg-green-100 text-green-700 px-4 sm:px-5 py-3 rounded-2xl inline-block max-w-full break-words">

                    Selected:
                    {" "}

                    <span className="font-semibold">

                      {file.name}

                    </span>

                    <div className="text-sm mt-1">

                      {(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(2)}
                      {" "}
                      MB

                    </div>

                  </div>

                )}

                {fileError && (

                  <div className="mt-5 bg-red-100 text-red-700 px-4 sm:px-5 py-3 rounded-2xl text-sm sm:text-base">

                    {fileError}

                  </div>

                )}

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-700 transition disabled:opacity-60"
            >

              {uploading
                ? "Uploading Resource..."
                : "Upload Resource"}

            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* TIPS */}
          <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-7">

            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-blue-600">

              Upload Tips

            </h2>

            <div className="space-y-5">

              <div className="flex gap-4">

                <div className="text-2xl">
                  ✅
                </div>

                <div>

                  <h3 className="font-bold mb-1 text-sm sm:text-base">

                    Clear Titles

                  </h3>

                  <p className="text-gray-600 text-sm leading-6">

                    Use meaningful
                    titles.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="text-2xl">
                  📚
                </div>

                <div>

                  <h3 className="font-bold mb-1 text-sm sm:text-base">

                    Proper Subjects

                  </h3>

                  <p className="text-gray-600 text-sm leading-6">

                    Add accurate
                    subject names.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="text-2xl">
                  🏷️
                </div>

                <div>

                  <h3 className="font-bold mb-1 text-sm sm:text-base">

                    Add Tags

                  </h3>

                  <p className="text-gray-600 text-sm leading-6">

                    Tags improve
                    searching.

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* SUPPORTED FILES */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl p-5 sm:p-7">

            <h2 className="text-xl sm:text-2xl font-bold mb-5">

              Supported Files

            </h2>

            <div className="space-y-3 text-blue-100 text-sm sm:text-base">

              <p>
                • PDF Notes
              </p>

              <p>
                • Word Documents
              </p>

              <p>
                • PPT Presentations
              </p>

              <p>
                • Text Files
              </p>

              <p>
                • PNG / JPG Images
              </p>

            </div>

          </div>

          {/* LIMITS */}
          <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-7">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">

              Upload Limits

            </h2>

            <p className="text-gray-600 leading-7 text-sm sm:text-base">

              Maximum file size:
              {" "}

              <span className="font-semibold">

                20MB

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Upload;