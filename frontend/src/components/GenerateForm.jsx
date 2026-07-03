function GenerateForm({

  topic,
  setTopic,

  contentType,
  setContentType,

  loading,
  generateContent

}) {

  return (

    <div
  className="
    bg-white/90
    backdrop-blur-lg
    border
    border-white/40
    rounded-3xl
    shadow-2xl
    p-10
    transition-all
    duration-300
    hover:shadow-blue-200
  "
>

      <div
  className="
    flex
    items-center
    gap-4
    mb-8
  "
>

  <div
    className="
      w-16
      h-16
      rounded-2xl
      bg-gradient-to-r
      from-blue-500
      to-purple-600
      flex
      items-center
      justify-center
      text-3xl
      text-white
    "
  >
    ✨
  </div>

  <div>

    <h1
      className="
        text-4xl
        font-bold
      "
    >
      AI Content Generator
    </h1>

    <p
      className="
        text-gray-500
        mt-1
      "
    >
      Create professional content powered by Gemini AI.
    </p>

  </div>

</div>

      <label
        className="
  font-semibold
  text-gray-700
"
      >
        Content Type
      </label>

      <select
        value={contentType}
        onChange={(event) =>
          setContentType(
            event.target.value
          )
        }
        className="
  w-full
  rounded-xl
  border
  border-gray-200
  p-4
  mt-2
  mb-6
  focus:ring-4
  focus:ring-blue-100
  focus:border-blue-500
  transition
"
      >

        <option value="linkedin">
          LinkedIn Post
        </option>

        <option value="twitter">
          Twitter/X Post
        </option>

        <option value="instagram">
          Instagram Caption
        </option>

        <option value="blog">
          Blog Outline
        </option>

      </select>

      <label
        className="
  font-semibold
  text-gray-700
"
      >
        Topic
      </label>

      <input
        type="text"
        placeholder="Enter topic..."
        value={topic}
        onChange={(event) =>
          setTopic(
            event.target.value
          )
        }
        className="
  w-full
  rounded-xl
  border
  border-gray-200
  p-4
  mt-2
  mb-6
  focus:ring-4
  focus:ring-blue-100
  focus:border-blue-500
  transition
"
      />

      <button
        onClick={generateContent}
        disabled={loading}
        className="
  bg-gradient-to-r
  from-blue-600
  to-purple-600
  text-white
  px-8
  py-4
  rounded-xl
  font-semibold
  shadow-lg
  hover:scale-105
  hover:shadow-xl
  transition-all
  duration-300
  disabled:opacity-50
"
      >
        {
  loading
    ? "Generating..."
    : "✨ Generate Content"
}
      </button>

    </div>

  );

}

export default GenerateForm;