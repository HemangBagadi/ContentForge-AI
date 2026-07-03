function QuickActions({ setContentType }) {

  const actions = [

    {
      label: "LinkedIn",
      icon: "💼",
      value: "linkedin"
    },

    {
      label: "Twitter",
      icon: "🐦",
      value: "twitter"
    },

    {
      label: "Instagram",
      icon: "📷",
      value: "instagram"
    },

    {
      label: "Blog",
      icon: "📝",
      value: "blog"
    }

  ];

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        px-6
        mt-6
      "
    >

      <div
        className="
          bg-white/80
          backdrop-blur-lg
          rounded-3xl
          shadow-xl
          p-6
        "
      >

        <h2
          className="
            text-xl
            font-bold
            mb-5
          "
        >
          ⚡ Quick Actions
        </h2>

        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {

            actions.map((action) => (

              <button
                key={action.value}
                onClick={() =>
                  setContentType(
                    action.value
                  )
                }
                className="
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  shadow-lg
                  hover:scale-105
                  transition-all
                "
              >

                {action.icon}{" "}

                {action.label}

              </button>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default QuickActions;