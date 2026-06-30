function HistoryList({

  contents,

  loading,

  viewContent,

  deleteContent

}) {

  if (loading) {

    return (

      <p>
        Loading...
      </p>

    );

  }

  if (contents.length === 0) {

    return (

      <p>
        No content found.
      </p>

    );

  }

  return (

    <div>

      {

        contents.map((item) => (

          <div
            key={item.id}
            className="
              bg-white
              p-4
              rounded-lg
              shadow
              mb-4
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
              "
            >
              {item.content_type}
            </p>

            <div
              className="
                mt-3
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
                "
              >
                View
              </button>

              <button
                onClick={() =>
                  deleteContent(item.id)
                }
                className="
                  bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded
                "
              >
                Delete
              </button>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default HistoryList;