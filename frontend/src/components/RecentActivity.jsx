function RecentActivity({ recentContent }) {

  return (

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
          font-bold
          mb-4
        "
      >
        Recent Activity
      </h2>

      {
        recentContent.length === 0 ? (

          <p
            className="
              text-gray-500
            "
          >
            No recent content.
          </p>

        ) : (

          recentContent.map((item) => (

            <div
              key={item.id}
              className="
                border-b
                py-3
              "
            >

              <h3
                className="
                  font-semibold
                "
              >
                {item.topic}
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                {item.content_type}
              </p>

              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                {
                  new Date(
                    item.created_at
                  ).toLocaleString()
                }
              </p>

            </div>

          ))

        )
      }

    </div>

  );

}

export default RecentActivity;