function AnalyticsCards({ stats }) {

  const cards = [

    {
      title: "Total Posts",
      value: stats.total,
      icon: "📄",
      gradient: "from-blue-500 to-cyan-500"
    },

    {
      title: "LinkedIn",
      value: stats.linkedin,
      icon: "💼",
      gradient: "from-indigo-500 to-blue-600"
    },

    {
      title: "Twitter/X",
      value: stats.twitter,
      icon: "🐦",
      gradient: "from-slate-700 to-black"
    },

    {
      title: "Instagram",
      value: stats.instagram,
      icon: "📷",
      gradient: "from-pink-500 to-purple-500"
    },

    {
      title: "Blog",
      value: stats.blog,
      icon: "📝",
      gradient: "from-green-500 to-emerald-600"
    }

  ];

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-2
        lg:grid-cols-5
        gap-6
        px-6
        pt-6
      "
    >

      {

        cards.map((card) => (

          <div
            key={card.title}
            className={`
              bg-gradient-to-br
              ${card.gradient}
              rounded-3xl
              p-6
              text-white
              shadow-xl
              hover:-translate-y-2
              hover:shadow-2xl
              transition-all
              duration-300
              cursor-pointer
            `}
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-white/80
                    text-sm
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                    mt-3
                  "
                >
                  {card.value}
                </h2>

              </div>

              <div
                className="
                  text-5xl
                "
              >
                {card.icon}
              </div>

            </div>

            <div
              className="
                mt-6
                text-white/80
                text-sm
              "
            >
              AI Generated Content
            </div>

          </div>

        ))

      }

    </div>

  );

}

export default AnalyticsCards;