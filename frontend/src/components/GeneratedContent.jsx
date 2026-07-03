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
    bg-white/90
    backdrop-blur-lg
    border
    border-white/40
    rounded-3xl
    shadow-2xl
    mt-8
    p-8
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
      w-14
      h-14
      rounded-2xl
      bg-gradient-to-r
      from-green-500
      to-blue-600
      flex
      items-center
      justify-center
      text-2xl
      text-white
    "
  >
    📄
  </div>

  <div>

    <h2
      className="
        text-3xl
        font-bold
      "
    >
      Generated Content
    </h2>

    <p
      className="
        text-gray-500
      "
    >
      Your AI-generated result is ready.
    </p>

  </div>

</div>

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
  rounded-xl
  border
  border-gray-200
  p-4
  mt-2
  mb-6
  focus:ring-4
  focus:ring-blue-100
  focus:border-blue-500
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
    bg-slate-50
    border
    border-slate-200
    rounded-2xl
    p-6
    text-gray-700
    leading-8
    max-h-[500px]
    overflow-y-auto
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
  bg-gradient-to-r
  from-purple-600
  to-pink-600
  text-white
  px-6
  py-3
  rounded-xl
  shadow-lg
  hover:scale-105
  transition-all
"
        >
          {
            loading
              ? "Rewriting..."
              : "✨ Rewrite Content"
          }
        </button>

        <button
          onClick={downloadTxt}
          className="
  bg-gradient-to-r
  from-green-500
  to-emerald-600
  text-white
  px-6
  py-3
  rounded-xl
  shadow-lg
  hover:scale-105
  transition-all
"
        >
          📄 Download TXT
        </button>

        <button
          onClick={downloadPdf}
          className="
  bg-gradient-to-r
  from-red-500
  to-rose-600
  text-white
  px-6
  py-3
  rounded-xl
  shadow-lg
  hover:scale-105
  transition-all
"
        >
          📕 Download PDF
        </button>

      </div>

    </div>

  );

}

export default GeneratedContent;