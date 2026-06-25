import { useState, useEffect } from "react";

import { jsPDF } from "jspdf";
import Navbar from "../components/Navbar";
import api from "../api/api";

function DashboardPage() {

  const [topic, setTopic] =
    useState("");

  const [contentType, setContentType] =
    useState("linkedin");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [notification, setNotification] =
    useState("");
  const [stats, setStats] =
  useState({

    total: 0,

    linkedin: 0,

    twitter: 0,

    instagram: 0,

    blog: 0

  });

  const [tone, setTone] =
  useState("professional");

  useEffect(() => {

    if (!notification) return;

    const timer =
      setTimeout(() => {

        setNotification("");

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [notification]);
  useEffect(() => {

  fetchStats();

}, []);

const fetchStats =
  async () => {

    try {

      const response =
        await api.get(
          "/dashboard-stats"
        );

      setStats(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const generateContent =
    async () => {

      if (!topic.trim()) {

        setNotification(
          "Please enter a topic."
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await api.post(
            "/generate-content",
            {
              topic,
              content_type: contentType
            }
          );

        setContent(
          response.data.content
        );

        fetchStats();

        setNotification(
          "Content generated successfully!"
        );

      } catch (error) {

        console.log(error);

        setNotification(
          "Failed to generate content."
        );

      } finally {

        setLoading(false);

      }

    };
    const rewriteGeneratedContent =
  async () => {

    if (!content) {

      setNotification(
        "Generate content first."
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await api.post(
          "/rewrite-content",
          {
            content,
            tone
          }
        );

      setContent(
        response.data.content
      );

      setNotification(
        "Content rewritten successfully!"
      );

    } catch (error) {

      console.log(error);

      setNotification(
        "Failed to rewrite content."
      );

    } finally {

      setLoading(false);

    }

  };
  const downloadTxt =
  () => {

    if (!content) {

      setNotification(
        "No content available."
      );

      return;

    }

    const blob =
      new Blob(
        [content],
        {
          type: "text/plain"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${contentType}-content.txt`;

    link.click();

    window.URL.revokeObjectURL(
      url
    );

  };
  const downloadPdf = () => {

  if (!content) {

    setNotification(
      "No content available."
    );

    return;

  }

  const pdf = new jsPDF();

  pdf.setFontSize(14);

  const lines = pdf.splitTextToSize(
    content,
    180
  );

  pdf.text(
    lines,
    15,
    20
  );

  pdf.save(
    `${contentType}-content.pdf`
  );

};

  return (


    <div
      className="
        min-h-screen
        bg-slate-100
      "
    >

      <Navbar />
      <div
  className="
    max-w-6xl
    mx-auto
    grid
    grid-cols-2
    md:grid-cols-5
    gap-4
    p-6
  "
>

  <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">
      Total
    </h3>

    <p className="text-3xl">
      {stats.total}
    </p>
  </div>

  <div className="bg-indigo-600 text-white rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">
      LinkedIn
    </h3>

    <p className="text-3xl">
      {stats.linkedin}
    </p>
  </div>

  <div className="bg-black text-white rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">
      Twitter
    </h3>

    <p className="text-3xl">
      {stats.twitter}
    </p>
  </div>

  <div className="bg-pink-600 text-white rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">
      Instagram
    </h3>

    <p className="text-3xl">
      {stats.instagram}
    </p>
  </div>

  <div className="bg-green-600 text-white rounded-lg p-4 text-center">
    <h3 className="text-lg font-bold">
      Blog
    </h3>

    <p className="text-3xl">
      {stats.blog}
    </p>
  </div>

</div>

      {notification && (

        <div
          className="
            bg-green-600
            text-white
            text-center
            py-3
          "
        >
          {notification}
        </div>

      )}

      <div
        className="
          max-w-4xl
          mx-auto
          p-6
        "
      >

        <div
          className="
            bg-white
            p-6
            rounded-lg
            shadow-md
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              mb-6
            "
          >
            AI Content Generator
          </h1>

          <label
            className="
              font-semibold
            "
          >
            Content Type
          </label>

          <select
            value={contentType}
            onChange={(event) =>
              setContentType(
                event.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded
              mb-4
              mt-2
            "
          >

            <option value="linkedin">
              LinkedIn Post
            </option>

            <option value="twitter">
              Twitter/X Post
            </option>

            <option value="instagram">
              Instagram Caption
            </option>

            <option value="blog">
              Blog Outline
            </option>

          </select>

          <label
            className="
              font-semibold
            "
          >
            Topic
          </label>

          <input
            type="text"
            placeholder="Enter topic..."
            value={topic}
            onChange={(event) =>
              setTopic(
                event.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded
              mb-4
              mt-2
            "
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded
              hover:bg-blue-700
              disabled:bg-gray-400
              disabled:cursor-not-allowed
            "
          >
            {
              loading
                ? "Generating..."
                : "Generate Content"
            }
          </button>

        </div>

        {content && (

          <div
            className="
              bg-white
              mt-6
              p-6
              rounded-lg
              shadow-md
              "
            >
            

            <h2
  className="
    text-2xl
    font-semibold
    mb-4
  "
>
  Generated Content
</h2>

<div
  className="
    mb-4
  "
>

  <label
    className="
      font-semibold
    "
  >
    Rewrite Tone
  </label>

  <select
    value={tone}
    onChange={(event) =>
      setTone(
        event.target.value
      )
    }
    className="
      w-full
      border
      rounded
      p-3
      mt-2
      mb-4
    "
  >

    <option value="professional">
      Professional
    </option>

    <option value="casual">
      Casual
    </option>

    <option value="friendly">
      Friendly
    </option>

    <option value="persuasive">
      Persuasive
    </option>

  </select>

</div>

<pre
  className="
    whitespace-pre-wrap
  "
>
  {content}
</pre>

<button
  onClick={rewriteGeneratedContent}
  disabled={loading}
  className="
    mt-4
    bg-purple-600
    text-white
    px-5
    py-2
    rounded
    hover:bg-purple-700
    disabled:bg-gray-400
  "
>
  {
    loading
      ? "Rewriting..."
      : "Rewrite Content"
  }
</button>
<button
  onClick={downloadTxt}
  className="
    mt-3
    ml-3
    bg-green-600
    text-white
    px-5
    py-2
    rounded
    hover:bg-green-700
  "
>
  Download TXT
</button>
<button
  onClick={downloadPdf}
  className="
    mt-3
    ml-3
    bg-red-600
    text-white
    px-5
    py-2
    rounded
    hover:bg-red-700
  "
>
  Download PDF
</button>

          </div>

        )}

      </div>

    </div>

  );

}

export default DashboardPage;