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
        bg-white
        p-6
        rounded-lg
        shadow-md
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        AI Content Generator
      </h1>

      <label
        className="
          font-semibold
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
          border
          p-3
          rounded
          mb-4
          mt-2
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
          border
          p-3
          rounded
          mb-4
          mt-2
        "
      />

      <button
        onClick={generateContent}
        disabled={loading}
        className="
          bg-blue-600
          text-white
          px-5
          py-3
          rounded
          hover:bg-blue-700
          disabled:bg-gray-400
          disabled:cursor-not-allowed
        "
      >
        {
          loading
            ? "Generating..."
            : "Generate Content"
        }
      </button>

    </div>

  );

}

export default GenerateForm;