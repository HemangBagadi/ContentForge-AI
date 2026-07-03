function RecentActivity({ recentContent }) {

  return (

    <div
      className="
        bg-white/90
        backdrop-blur-lg
        rounded-3xl
        shadow-xl
        border
        border-slate-200
        p-8
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-slate-800
          "
        >
          Recent Activity
        </h2>

        <span
          className="
            text-sm
            text-gray-400
          "
        >
          Last 5 Posts
        </span>

      </div>

      {

        recentContent.length === 0 ? (

          <div
            className="
              text-center
              py-12
            "
          >

            <div
              className="
                text-5xl
                mb-3
              "
            >
              📭
            </div>

            <p
              className="
                text-gray-500
              "
            >
              No recent content yet.
            </p>

          </div>

        ) : (

          <div
            className="
              space-y-4
            "
          >

            {

              recentContent.map((item) => (

                <div
                  key={item.id}
                  className="
                    flex
                    justify-between
                    items-center
                    bg-slate-50
                    rounded-2xl
                    p-3
                    hover:bg-slate-100
                    transition
                  "
                >

                  <div>

                    <span
                      className={`
                        inline-block
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        text-white

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

                    <h3
                      className="
                        mt-2
                        font-bold
                        text-lg
                        text-slate-800
                      "
                    >
                      {item.topic}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                    >
                      🕒 {new Date(item.created_at).toLocaleString()}
                    </p>

                  </div>

                  <div
                    className="
                      text-3xl
                    "
                  >
                    {item.content_type === "linkedin"
                      ? "💼"
                      : item.content_type === "twitter"
                      ? "🐦"
                      : item.content_type === "instagram"
                      ? "📷"
                      : "📝"}
                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default RecentActivity;