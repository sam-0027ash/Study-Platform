import { Link } from "react-router-dom";

function Home() {

  const resources = [

    {
      subject: "Computer Science",
      title: "React Development Notes",
      description:
        "Complete beginner-friendly React notes.",
      user: "Alex",
      buttonColor: "bg-blue-600",
      textColor: "text-blue-600",
    },

    {
      subject: "Mathematics",
      title: "Calculus Formula Guide",
      description:
        "Important differentiation and integration formulas with solved examples.",
      user: "Sarah",
      buttonColor: "bg-green-600",
      textColor: "text-green-600",
    },

    {
      subject: "Data Science",
      title: "Python Machine Learning",
      description:
        "Learn ML concepts, regression models, and Python implementations.",
      user: "John",
      buttonColor: "bg-purple-600",
      textColor: "text-purple-600",
    },

    {
      subject: "Networking",
      title: "Cyber Security Basics",
      description:
        "Notes covering encryption, authentication, and network protection fundamentals.",
      user: "Emma",
      buttonColor: "bg-red-600",
      textColor: "text-red-600",
    },

    {
      subject: "Web Development",
      title: "JavaScript Essentials",
      description:
        "Understand JavaScript fundamentals, ES6 features, and DOM manipulation.",
      user: "David",
      buttonColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },

    {
      subject: "Database",
      title: "MongoDB Complete Guide",
      description:
        "Learn collections, queries, and MongoDB backend integration.",
      user: "Sophia",
      buttonColor: "bg-emerald-600",
      textColor: "text-emerald-600",
    },

  ];

  const features = [

    {
      icon: "📚",
      title: "Upload Notes",
      description:
        "Share study materials, PDFs, assignments, and lecture notes with the community.",
    },

    {
      icon: "🔍",
      title: "Explore Resources",
      description:
        "Browse resources by subject and quickly discover useful educational content.",
    },

    {
      icon: "🔐",
      title: "Secure Access",
      description:
        "JWT authentication keeps user accounts and uploaded resources secure.",
    },

  ];

  const stats = [

    {
      number: "10K+",
      label: "Shared Resources",
    },

    {
      number: "5K+",
      label: "Students",
    },

    {
      number: "100+",
      label: "Subjects",
    },

    {
      number: "24/7",
      label: "Access",
    },

  ];

  const scrollingResources = [
    ...resources,
    ...resources,
  ];

  return (

    <div className="min-h-screen bg-gray-100 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-10 left-10 w-48 md:w-72 h-48 md:h-72 bg-white rounded-full blur-3xl"></div>

          <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-pink-300 rounded-full blur-3xl"></div>

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">

                🌍 Trusted by Students Worldwide

              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 md:mb-8">

                Study Resource
                <br />

                Sharing Platform

              </h1>

              <p className="text-base md:text-lg text-blue-100 leading-7 md:leading-9 max-w-2xl">

                Upload, discover, and share study
                materials, notes, assignments, and
                educational resources with students
                and learners around the world.

              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">

                <Link to="/signup">

                  <button className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition shadow-2xl">

                    Get Started

                  </button>

                </Link>

                <Link to="/login">

                  <button className="w-full sm:w-auto bg-black/20 backdrop-blur-md border border-white px-8 py-4 rounded-2xl font-bold hover:bg-black/30 transition">

                    Login

                  </button>

                </Link>

              </div>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">

              {stats.map((stat, index) => (

                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 md:p-8 text-center"
                >

                  <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">

                    {stat.number}

                  </h2>

                  <p className="text-blue-100 text-sm md:text-base">

                    {stat.label}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        <div className="text-center mb-14 md:mb-20">

          <h2 className="text-3xl md:text-5xl font-bold mb-5 md:mb-6">

            Why Students Love StudyShare

          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-7 md:leading-8">

            Everything you need to upload,
            organize, and explore educational
            resources in one powerful platform.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-5xl md:text-6xl mb-6 md:mb-8">

                {feature.icon}

              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5">

                {feature.title}

              </h3>

              <p className="text-gray-600 leading-7 md:leading-8 text-base md:text-lg">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* RESOURCE SHOWCASE */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">

        <div className="text-center mb-12 md:mb-16 px-4 sm:px-6">

          <h2 className="text-3xl md:text-5xl font-bold mb-5 md:mb-6">

            Discover Shared Resources

          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-7 md:leading-8">

            Explore study notes, assignments,
            presentations, and learning materials
            shared by students worldwide.

          </p>

        </div>

        <div className="overflow-hidden w-full">

          <div className="flex gap-4 md:gap-6 animate-scroll w-max px-4 sm:px-6">

            {scrollingResources.map(
              (resource, index) => (

                <div
                  key={index}
                  className="w-[260px] sm:w-[300px] md:w-[320px] min-h-[280px] bg-gray-50 rounded-3xl shadow-lg p-5 md:p-6 border flex flex-col justify-between flex-shrink-0 hover:shadow-2xl transition"
                >

                  <div>

                    <p
                      className={`font-semibold mb-3 ${resource.textColor} text-sm`}
                    >

                      {resource.subject}

                    </p>

                    <h3 className="text-xl md:text-2xl font-bold mb-4 leading-snug">

                      {resource.title}

                    </h3>

                    <p className="text-gray-600 leading-6 md:leading-7 text-sm md:text-base">

                      {resource.description}

                    </p>

                  </div>

                  <div className="flex justify-between items-center mt-6">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">

                        {resource.user.charAt(0)}

                      </div>

                      <span className="text-sm text-gray-500">

                        {resource.user}

                      </span>

                    </div>

                    <button
                      className={`${resource.buttonColor} text-white px-4 md:px-5 py-2 rounded-xl hover:opacity-90 transition text-sm md:text-base`}
                    >

                      Open

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 px-4 sm:px-6">

        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[30px] md:rounded-[40px] p-8 md:p-16 text-white shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">

            <div>

              <h2 className="text-3xl md:text-5xl font-bold mb-5 md:mb-6 leading-tight">

                Start Sharing Knowledge Today 🚀

              </h2>

              <p className="text-blue-100 text-base md:text-lg leading-7 md:leading-8">

                Join thousands of students who are
                sharing educational resources and
                learning together through StudyShare.

              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:justify-end">

              <Link to="/signup">

                <button className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">

                  Create Account

                </button>

              </Link>

              <Link to="/login">

                <button className="w-full sm:w-auto bg-black/20 border border-white px-8 py-4 rounded-2xl font-bold hover:bg-black/30 transition">

                  Login Now

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white px-4 sm:px-6 py-10">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold text-blue-400">

              StudyShare

            </h2>

            <p className="text-gray-400 mt-2 text-sm md:text-base">

              Empowering students through shared knowledge.

            </p>

          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-gray-400">

            <Link
              to="/about"
              className="hover:text-white transition"
            >

              About

            </Link>

            <Link
              to="/contact"
              className="hover:text-white transition"
            >

              Contact

            </Link>

            <Link
              to="/login"
              className="hover:text-white transition"
            >

              Login

            </Link>

          </div>

        </div>

      </footer>

      {/* ANIMATION */}
      <style>
        {`
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }

          @keyframes scroll {

            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }

          }
        `}
      </style>

    </div>

  );

}

export default Home;