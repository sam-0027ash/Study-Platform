function About() {

  const features = [

    {
      icon: "📚",
      title: "Upload Resources",
      description:
        "Users can upload notes, PDFs, assignments, presentations, and study materials securely through the platform.",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      icon: "🔍",
      title: "Browse Materials",
      description:
        "Search and filter educational resources easily using subjects, categories, and keywords.",
      bg: "bg-green-50",
      text: "text-green-600",
    },

    {
      icon: "🔐",
      title: "Secure Authentication",
      description:
        "JWT authentication protects user accounts and keeps platform access secure.",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },

  ];

  const steps = [

    {
      number: "1",
      color: "bg-blue-600",
      title: "Create an Account",
      description:
        "Sign up using your name, email, and password to access platform features.",
    },

    {
      number: "2",
      color: "bg-green-600",
      title: "Browse Resources",
      description:
        "Explore study materials uploaded by students and learners.",
    },

    {
      number: "3",
      color: "bg-purple-600",
      title: "Upload Materials",
      description:
        "Share your own educational resources with the community.",
    },

    {
      number: "4",
      color: "bg-red-600",
      title: "Download & Learn",
      description:
        "Open and download shared files anytime for learning and revision.",
    },

  ];

  const technologies = [

    {
      name: "React.js",
      style:
        "bg-blue-100 text-blue-700",
    },

    {
      name: "Node.js",
      style:
        "bg-green-100 text-green-700",
    },

    {
      name: "Express.js",
      style:
        "bg-gray-200 text-gray-800",
    },

    {
      name: "MongoDB",
      style:
        "bg-emerald-100 text-emerald-700",
    },

    {
      name: "JWT Authentication",
      style:
        "bg-yellow-100 text-yellow-700",
    },

    {
      name: "Tailwind CSS",
      style:
        "bg-indigo-100 text-indigo-700",
    },

  ];

  return (

    <div className="min-h-screen bg-gray-100 py-14 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden mb-10">

          <div className="px-8 md:px-14 py-16 text-white">

            <div className="max-w-4xl">

              <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-2xl mb-6">

                <p className="font-semibold">
                  🌍 Collaborative Learning Platform
                </p>

              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">

                About StudyShare

              </h1>

              <p className="text-xl text-blue-100 leading-9">

                StudyShare is a modern study resource
                sharing platform built to help students
                collaborate, exchange knowledge, and
                access educational materials anytime
                from anywhere.

              </p>

            </div>

          </div>

        </div>

        {/* INTRO SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h2 className="text-4xl font-bold mb-6">

                What is StudyShare?

              </h2>

              <p className="text-gray-600 text-lg leading-8 mb-6">

                StudyShare is a full-stack web application
                where users can upload, browse, and download
                educational resources including notes,
                assignments, PDFs, presentations,
                and study guides.

              </p>

              <p className="text-gray-600 text-lg leading-8">

                The platform encourages collaborative
                learning by helping students support
                each other through shared knowledge
                and organized educational content.

              </p>

            </div>

            {/* RIGHT INFO BOX */}
            <div className="grid gap-6">

              <div className="bg-blue-50 rounded-3xl p-7">

                <div className="text-5xl mb-4">
                  📚
                </div>

                <h3 className="text-2xl font-bold mb-3">

                  Educational Resources

                </h3>

                <p className="text-gray-600 leading-7">

                  Share study notes, assignments,
                  PDFs, and learning materials
                  with students worldwide.

                </p>

              </div>

              <div className="bg-green-50 rounded-3xl p-7">

                <div className="text-5xl mb-4">
                  🌍
                </div>

                <h3 className="text-2xl font-bold mb-3">

                  Student Community

                </h3>

                <p className="text-gray-600 leading-7">

                  Build a collaborative learning
                  environment where students can
                  help each other grow academically.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FEATURES */}
        <div className="mb-10">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">

              Main Features

            </h2>

            <p className="text-gray-600 text-lg">

              Everything students need for sharing
              and discovering study resources.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition"
              >

                <div
                  className={`${feature.bg} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6`}
                >

                  {feature.icon}

                </div>

                <h3 className="text-2xl font-bold mb-4">

                  {feature.title}

                </h3>

                <p className="text-gray-600 leading-8">

                  {feature.description}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* HOW TO USE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">

          <div className="mb-12">

            <h2 className="text-4xl font-bold mb-4">

              How to Use the Platform

            </h2>

            <p className="text-gray-600 text-lg">

              Start learning and sharing in
              just a few simple steps.

            </p>

          </div>

          <div className="space-y-8">

            {steps.map((step, index) => (

              <div
                key={index}
                className="flex gap-6"
              >

                <div
                  className={`${step.color} w-14 h-14 rounded-full text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg`}
                >

                  {step.number}

                </div>

                <div>

                  <h3 className="text-2xl font-bold mb-2">

                    {step.title}

                  </h3>

                  <p className="text-gray-600 leading-8 text-lg">

                    {step.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TECHNOLOGIES */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">

          <div className="mb-10">

            <h2 className="text-4xl font-bold mb-4">

              Technologies Used

            </h2>

            <p className="text-gray-600 text-lg">

              StudyShare is built using modern
              full-stack web development technologies.

            </p>

          </div>

          <div className="flex flex-wrap gap-5">

            {technologies.map((tech, index) => (

              <div
                key={index}
                className={`${tech.style} px-6 py-4 rounded-2xl font-bold text-lg shadow-sm`}
              >

                {tech.name}

              </div>

            ))}

          </div>

        </div>

        {/* FINAL SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">

          <div className="px-8 md:px-14 py-16 text-center text-white">

            <div className="text-6xl mb-6">
              🚀
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">

              Learn Together. Grow Together.

            </h2>

            <p className="text-xl text-blue-100 leading-9 max-w-4xl mx-auto">

              StudyShare was created with the vision
              of building a collaborative learning
              environment where students can support
              each other by sharing educational
              resources, study notes, and knowledge.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default About;