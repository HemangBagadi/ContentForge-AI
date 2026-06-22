import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../api/api";

function HistoryPage() {

  const [contents, setContents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedContent, setSelectedContent] =
    useState(null);

  const [notification, setNotification] =
    useState("");

  useEffect(() => {

    fetchHistory();

  }, []);

  useEffect(() => {

    if (!notification) return;

    const timer =
      setTimeout(() => {

        setNotification("");

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, [notification]);

  const fetchHistory =
    async () => {

      setLoading(true);

      try {

        const response =
        await api.get(
          "/content-history"
        );

      console.log(
        "HISTORY RESPONSE:",
        response.data
      );

      setContents(
        response.data
      );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const viewContent =
    async (contentId) => {

      try {

        const response =
          await api.get(
            `/content/${contentId}`
          );

        setSelectedContent(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const deleteContent =
    async (contentId) => {

      try {

        await api.delete(
          `/content/${contentId}`
        );

        fetchHistory();

        if (
          selectedContent &&
          selectedContent.id === contentId
        ) {

          setSelectedContent(
            null
          );

        }

        setNotification(
          "Content deleted successfully!"
        );

      } catch (error) {

        console.log(error);

      }

    };

  const copyContent =
    async () => {

      try {

        await navigator.clipboard.writeText(
          selectedContent.generated_content
        );

        setNotification(
          "Content copied successfully!"
        );

      } catch (error) {

        console.log(error);

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
            bg-green-500
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
          max-w-5xl
          mx-auto
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Content History
        </h1>

        {loading && (

          <p>
            Loading...
          </p>

        )}

        {!loading &&
          contents.length === 0 && (

            <div
              className="
                bg-white
                p-6
                rounded-lg
                shadow-md
              "
            >
              No content found.
            </div>

        )}

        <div
          className="
            grid
            gap-4
          "
        >

          {contents.map(
            (item) => (

              <div
                key={item.id}
                className="
                  bg-white
                  p-5
                  rounded-lg
                  shadow-md
                "
              >

                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  {item.topic}
                </h3>

                <p
                  className="
                    text-gray-500
                    mb-4
                  "
                >
                  {item.content_type}
                </p>

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <button
                    onClick={() =>
                      viewContent(item.id)
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded
                      hover:bg-blue-700
                    "
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      deleteContent(item.id)
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded
                      hover:bg-red-600
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
          )}

        </div>

        {selectedContent && (

          <div
            className="
              bg-white
              mt-8
              p-6
              rounded-lg
              shadow-md
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
                mb-4
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Full Content
              </h2>

              <button
                onClick={copyContent}
                className="
                  bg-green-600
                  text-white
                  px-4
                  py-2
                  rounded
                  hover:bg-green-700
                "
              >
                Copy Content
              </button>

            </div>

            <h3
              className="
                text-xl
                font-semibold
                mb-4
              "
            >
              {selectedContent.topic}
            </h3>

            <pre
              className="
                whitespace-pre-wrap
              "
            >
              {
                selectedContent.generated_content
              }
            </pre>

          </div>

        )}

      </div>

    </div>

  );

}

export default HistoryPage;