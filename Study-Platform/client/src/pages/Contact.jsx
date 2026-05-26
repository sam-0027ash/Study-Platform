import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSending(true);

    // FAKE DELAY
    setTimeout(() => {

      alert(
        "Message sent successfully!"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSending(false);

    }, 1500);

  };

  const contactCards = [

    {
      icon: "📧",
      title: "Email Support",
      description:
        "Reach out anytime for technical support, feedback, or general inquiries.",
      info: "support@studyshare.com",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      icon: "💬",
      title: "Student Community",
      description:
        "Connect with learners, collaborate, and exchange educational resources.",
      info: "Community Discussions",
      bg: "bg-green-50",
      text: "text-green-600",
    },

    {
      icon: "🚀",
      title: "Platform Support",
      description:
        "Need help uploading resources or managing your account? We are here to help.",
      info: "24/7 Assistance",
      bg: "bg-purple-50",
      text: "text-purple-600",
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
                  📩 Get In Touch With Us
                </p>

              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">

                Contact StudyShare

              </h1>

              <p className="text-xl text-blue-100 leading-9">

                Have questions, suggestions,
                feedback, or need help using
                StudyShare? Our team is always
                ready to assist students and
                learners around the world.

              </p>

            </div>

          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-10 mb-10">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* INTRO */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-4xl font-bold mb-5">

                Get In Touch

              </h2>

              <p className="text-gray-600 text-lg leading-8">

                Whether you want to report an issue,
                share feedback, suggest improvements,
                or ask questions about the platform,
                feel free to contact us anytime.

              </p>

            </div>

            {/* CONTACT CARDS */}
            {contactCards.map((card, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-7 hover:shadow-2xl transition"
              >

                <div className="flex gap-5">

                  <div
                    className={`${card.bg} ${card.text} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0`}
                  >

                    {card.icon}

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold mb-3">

                      {card.title}

                    </h3>

                    <p className="text-gray-600 leading-7 mb-3">

                      {card.description}

                    </p>

                    <p
                      className={`${card.text} font-semibold`}
                    >

                      {card.info}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

            <div className="mb-8">

              <h2 className="text-4xl font-bold mb-4">

                Send a Message

              </h2>

              <p className="text-gray-600 text-lg leading-8">

                Fill out the form below and
                we’ll get back to you as
                soon as possible.

              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="block text-gray-700 font-semibold mb-3">

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-gray-700 font-semibold mb-3">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>

              {/* SUBJECT */}
              <div>

                <label className="block text-gray-700 font-semibold mb-3">

                  Subject

                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="block text-gray-700 font-semibold mb-3">

                  Message

                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
              >

                {sending
                  ? "Sending Message..."
                  : "Send Message"}

              </button>

            </form>

          </div>

        </div>

        {/* FOOTER SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">

          <div className="px-8 md:px-14 py-16 text-center text-white">

            <div className="text-6xl mb-6">
              💙
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">

              We Value Your Feedback

            </h2>

            <p className="text-xl text-blue-100 leading-9 max-w-4xl mx-auto">

              StudyShare is built for students
              and learners. Your suggestions
              and feedback help us improve the
              platform and create a better
              learning experience for everyone.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Contact;