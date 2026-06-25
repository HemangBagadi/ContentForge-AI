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
  
  const [searchTerm, setSearchTerm] =
  useState("");

  const [filterType, setFilterType] =
  useState("all");

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

const filteredContents =
  contents.filter((item) => {

    const matchesSearch =
      item.topic
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesType =
      filterType === "all"
        ? true
        : item.content_type === filterType;

    return (
      matchesSearch &&
      matchesType
    );

  });

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
        <div
  className="
    grid
    md:grid-cols-2
    gap-4
    mb-6
  "
>

  <input
    type="text"
    placeholder="Search by topic..."
    value={searchTerm}
    onChange={(event) =>
      setSearchTerm(
        event.target.value
      )
    }
    className="
      border
      rounded
      p-3
    "
  />

  <select
    value={filterType}
    onChange={(event) =>
      setFilterType(
        event.target.value
      )
    }
    className="
      border
      rounded
      p-3
    "
  >

    <option value="all">
      All Types
    </option>

    <option value="linkedin">
      LinkedIn
    </option>

    <option value="twitter">
      Twitter/X
    </option>

    <option value="instagram">
      Instagram
    </option>

    <option value="blog">
      Blog
    </option>

  </select>

</div>

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
        p-8
        rounded-lg
        shadow-md
        text-center
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-2
        "
      >
        No Content Yet
      </h2>

      <p
        className="
          text-gray-500
        "
      >
        Generate your first AI content from the Dashboard.
      </p>

    </div>

)}

        <div
          className="
            grid
            gap-4
          "
        >

          {filteredContents.map(
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

                <span
  className={`
    inline-block
    px-3
    py-1
    rounded-full
    text-white
    text-sm
    font-semibold
    mb-4

    ${
      item.content_type === "linkedin"
        ? "bg-blue-600"
        : item.content_type === "twitter"
        ? "bg-black"
        : item.content_type === "instagram"
        ? "bg-pink-600"
        : "bg-green-600"
    }
  `}
>
  {item.content_type.toUpperCase()}
</span>

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