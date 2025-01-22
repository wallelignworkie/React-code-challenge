import { useState } from "react";

interface userText {
  user_text: String;
}

const ErrorMessage = ({ user_text }: userText) => {
  // State to control the visibility of the alert
  const [isVisible, setIsVisible] = useState(true);

  // Handler to close the alert box when the "x" is clicked
  const handleClose = () => {
    setIsVisible(false);
  };

  // If the alert is not visible, return null (render nothing)
  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <div
        className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="font-medium">Error !</span>
            {user_text}
          </div>
          <button
            className="ml-3 text-red-800 dark:text-green-400 hover:text-red-500"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 7.586l4.293-4.293a1 1 0 111.414 1.414L11.414 9l4.293 4.293a1 1 0 01-1.414 1.414L10 10.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 9 4.293 4.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
