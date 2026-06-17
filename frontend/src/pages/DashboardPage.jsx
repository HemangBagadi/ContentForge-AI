import { useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api/api";

function DashboardPage() {

  const [topic, setTopic] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateContent =
    async () => {

      if (!topic.trim()) {

        alert(
          "Please enter a topic"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await api.post(
            "/generate-linkedin-post",
            {
              topic
            }
          );

        setContent(
          response.data.content
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate content"
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
              mb-4
            "
          >
            Generate LinkedIn Post
          </h1>

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
            "
          />

          <button
            onClick={generateContent}
            className="
              bg-blue-600
              text-white
              px-5
              py-2
              rounded
              hover:bg-blue-700
            "
          >
            Generate Content
          </button>

        </div>

        {loading && (

          <p
            className="
              mt-4
            "
          >
            Generating...
          </p>

        )}

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

            <pre
              className="
                whitespace-pre-wrap
              "
            >
              {content}
            </pre>

          </div>

        )}

      </div>

    </div>

  );

}

export default DashboardPage;