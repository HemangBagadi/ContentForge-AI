import { useState, useEffect, useRef } from "react";

import QuickActions from "../components/QuickActions";
import Notification from "../components/Notification";
import RecentActivity from "../components/RecentActivity";
import GeneratedContent from "../components/GeneratedContent";
import GenerateForm from "../components/GenerateForm";
import AnalyticsCards from "../components/AnalyticsCards";
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
  const [recentContent, setRecentContent] =
  useState([]);

  const [tone, setTone] =
  useState("professional");

  const generatorRef = useRef(null);

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

  fetchRecentContent();

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

  const fetchRecentContent =
  async () => {

    try {

      const response =
        await api.get(
          "/recent-content"
        );

      setRecentContent(
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

        fetchRecentContent();

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
    bg-gradient-to-br
    from-slate-50
    via-blue-50
    to-purple-100
  "
>

      <Navbar />
  <AnalyticsCards
  stats={stats}
/>
<div
  className="
    max-w-6xl
    mx-auto
    px-6
    mt-2
    mb-8
  "
>

  <div
    className="
      bg-gradient-to-r
      from-blue-600
      to-purple-600
      rounded-3xl
      shadow-xl
      text-white
      p-10
      flex
      justify-between
      items-center
    "
  >

    <div>

      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Welcome back 👋
      </h1>

      <p
        className="
          text-lg
          mt-3
          text-blue-100
        "
      >
        Write LinkedIn posts, Instagram captions,
Twitter threads and blog outlines with AI.
      </p>

      <button
  onClick={() =>
    generatorRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }
  className="
    mt-6
    bg-white
    text-blue-700
    px-6
    py-3
    rounded-xl
    font-semibold
    hover:scale-105
    transition
  "
>
  ✨ Start Creating
</button>

    </div>
    

    <div
      className="
        hidden
        md:block
        text-8xl
      "
    >
      🤖
    </div>

  </div>

</div>

      <Notification
  message={notification}
/>

      <div
  className="
    max-w-7xl
    mx-auto
    px-6
    pb-10
  "
>

        <div
  className="
    grid
    lg:grid-cols-3
    gap-8
    mt-8
  "
>

  <div
    className="
      lg:col-span-2
    "
  >

    <div ref={generatorRef}>

  <GenerateForm
    topic={topic}
    setTopic={setTopic}
    contentType={contentType}
    setContentType={setContentType}
    loading={loading}
    generateContent={generateContent}
  />

</div>

  </div>

  <div>

    <RecentActivity
      recentContent={recentContent}
    />

  </div>

</div>

{content && (

  <GeneratedContent
    content={content}
    tone={tone}
    setTone={setTone}
    loading={loading}
    rewriteGeneratedContent={rewriteGeneratedContent}
    downloadTxt={downloadTxt}
    downloadPdf={downloadPdf}
  />

)}
      </div>

    </div>

  );

}

export default DashboardPage;