function GeneratedContent({

  content,

  tone,
  setTone,

  loading,

  rewriteGeneratedContent,

  downloadTxt,

  downloadPdf

}) {

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
          font-semibold
          mb-4
        "
      >
        Generated Content
      </h2>

      <div
        className="
          mb-4
        "
      >

        <label
          className="
            font-semibold
          "
        >
          Rewrite Tone
        </label>

        <select
          value={tone}
          onChange={(event) =>
            setTone(
              event.target.value
            )
          }
          className="
            w-full
            border
            rounded
            p-3
            mt-2
            mb-4
          "
        >

          <option value="professional">
            Professional
          </option>

          <option value="casual">
            Casual
          </option>

          <option value="friendly">
            Friendly
          </option>

          <option value="persuasive">
            Persuasive
          </option>

        </select>

      </div>

      <pre
        className="
          whitespace-pre-wrap
        "
      >
        {content}
      </pre>

      <div
        className="
          flex
          flex-wrap
          gap-3
          mt-4
        "
      >

        <button
          onClick={rewriteGeneratedContent}
          disabled={loading}
          className="
            bg-purple-600
            text-white
            px-5
            py-2
            rounded
            hover:bg-purple-700
            disabled:bg-gray-400
          "
        >
          {
            loading
              ? "Rewriting..."
              : "Rewrite Content"
          }
        </button>

        <button
          onClick={downloadTxt}
          className="
            bg-green-600
            text-white
            px-5
            py-2
            rounded
            hover:bg-green-700
          "
        >
          Download TXT
        </button>

        <button
          onClick={downloadPdf}
          className="
            bg-red-600
            text-white
            px-5
            py-2
            rounded
            hover:bg-red-700
          "
        >
          Download PDF
        </button>

      </div>

    </div>

  );

}

export default GeneratedContent;