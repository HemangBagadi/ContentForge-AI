function AnalyticsCards({ stats }) {

  return (

    <div
      className="
        max-w-6xl
        mx-auto
        grid
        grid-cols-2
        md:grid-cols-5
        gap-4
        p-6
      "
    >

      <div
        className="
          bg-blue-600
          text-white
          rounded-lg
          p-4
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
          "
        >
          Total
        </h3>

        <p
          className="
            text-3xl
          "
        >
          {stats.total}
        </p>

      </div>

      <div
        className="
          bg-indigo-600
          text-white
          rounded-lg
          p-4
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
          "
        >
          LinkedIn
        </h3>

        <p
          className="
            text-3xl
          "
        >
          {stats.linkedin}
        </p>

      </div>

      <div
        className="
          bg-black
          text-white
          rounded-lg
          p-4
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
          "
        >
          Twitter
        </h3>

        <p
          className="
            text-3xl
          "
        >
          {stats.twitter}
        </p>

      </div>

      <div
        className="
          bg-pink-600
          text-white
          rounded-lg
          p-4
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
          "
        >
          Instagram
        </h3>

        <p
          className="
            text-3xl
          "
        >
          {stats.instagram}
        </p>

      </div>

      <div
        className="
          bg-green-600
          text-white
          rounded-lg
          p-4
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-bold
          "
        >
          Blog
        </h3>

        <p
          className="
            text-3xl
          "
        >
          {stats.blog}
        </p>

      </div>

    </div>

  );

}

export default AnalyticsCards;