function Notification({

  message,

  type = "success"

}) {

  if (!message) {

    return null;

  }

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : "bg-red-600";

  return (

    <div
      className={`
        fixed
        top-5
        right-5
        z-50
        ${bgColor}
        text-white
        px-6
        py-4
        rounded-lg
        shadow-xl
        animate-pulse
      `}
    >

      {message}

    </div>

  );

}

export default Notification;