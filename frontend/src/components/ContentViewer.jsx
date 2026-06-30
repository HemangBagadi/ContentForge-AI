function ContentViewer({

  selectedContent,

  copyContent

}) {

  if (!selectedContent) {

    return null;

  }

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
        Full Content
      </h2>

      <h3
        className="
          text-xl
          font-semibold
          mb-3
        "
      >
        {selectedContent.topic}
      </h3>

      <button
        onClick={copyContent}
        className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded
          mb-4
          hover:bg-green-700
        "
      >
        Copy Content
      </button>

      <pre
        className="
          whitespace-pre-wrap
          bg-gray-100
          p-4
          rounded
        "
      >
        {selectedContent.generated_content}
      </pre>

    </div>

  );

}

export default ContentViewer;