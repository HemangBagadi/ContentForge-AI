import { useState, useEffect } from "react";

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

  return (


    <div
      className="
        min-h-screen
        bg-slate-100
      "
    >

      <Navbar />

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

          </div>

        )}

      </div>

    </div>

  );

}

export default DashboardPage;