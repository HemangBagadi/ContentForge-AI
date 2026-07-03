import { useEffect, useState } from "react";

import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import HistoryList from "../components/HistoryList";
import ContentViewer from "../components/ContentViewer";
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
    relative
    overflow-hidden
    bg-gradient-to-br
    from-blue-50
    via-white
    to-purple-100
  "
>

      <Navbar />
      <div
  className="
    absolute
    top-20
    left-10
    w-96
    h-96
    bg-blue-300/30
    rounded-full
    blur-[120px]
    -z-10
  "
></div>

<div
  className="
    absolute
    right-10
    top-52
    w-96
    h-96
    bg-purple-300/30
    rounded-full
    blur-[120px]
    -z-10
  "
></div>

      <Notification
  message={notification}
/>

      <div
  className="
    relative
    z-10
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
  w-full
  rounded-xl
  border
  border-slate-200
  p-4
  shadow-sm
  focus:ring-4
  focus:ring-blue-100
  focus:border-blue-500
  transition
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
  w-full
  rounded-xl
  border
  border-slate-200
  p-4
  shadow-sm
  focus:ring-4
  focus:ring-blue-100
  focus:border-blue-500
  transition
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

          <LoadingSpinner />

        )}

        {!loading &&
  contents.length === 0 && (

    <div
  key={item.id}
  className="
    bg-white/90
    backdrop-blur-lg
    border
    border-slate-200
    rounded-2xl
    shadow-lg
    p-6
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
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
  bg-white/90
  backdrop-blur-lg
  rounded-2xl
  shadow-lg
  border
  border-slate-200
  p-6
  hover:shadow-xl
  hover:-translate-y-1
  transition-all
  duration-300
"
              >

               <div
  className="
    flex
    justify-between
    items-center
    gap-6
  "
>

  <div
    className="
      flex-1
    "
  >

    <h3
      className="
        text-2xl
        font-bold
        text-slate-800
      "
    >
      {item.topic}
    </h3>

    <div
      className="
        flex
        items-center
        gap-3
        mt-3
      "
    >

      <span
        className={`
          inline-flex
          items-center
          px-4
          py-1
          rounded-full
          text-sm
          text-white
          font-semibold

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

      <span
        className="
          text-gray-400
          text-sm
        "
      >
        📅 {new Date(item.created_at).toLocaleDateString()}
      </span>

    </div>

  </div>

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
        px-5
        py-2
        rounded-xl
        hover:bg-blue-700
        transition
      "
    >
      👁 View
    </button>

    <button
      onClick={() =>
        deleteContent(item.id)
      }
      className="
        bg-red-500
        text-white
        px-5
        py-2
        rounded-xl
        hover:bg-red-600
        transition
      "
    >
      🗑 Delete
    </button>

  </div>

</div>

              </div>

            )
          )}

        </div>

       <ContentViewer
  selectedContent={selectedContent}
  copyContent={copyContent}
/>

      </div>

    </div>

  );

}

export default HistoryPage;