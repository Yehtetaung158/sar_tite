import React from "react";
import useDarkMode from "../Hooks/useDarkMode";

const Theme = () => {
  const { mode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <div className="flex items-center justify-center bg-white rounded-3xl dark:bg-gray-500 border-2 border-gray-600">
        <button
          onClick={toggleDarkMode}
          className="flex justify-center items-center pl-2 w-full rounded-full"
        >
          <span className=" dark:text-white">Theme</span>
          <div
            className="flex items-center justify-center font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            data-hs-theme-click-value="dark"
          >
            {mode ? (
              <span className="group inline-flex shrink-0 justify-center items-center size-9">
                <svg
                  className="shrink-0 size-4 text-gray-200 group-hover:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={4} />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              </span>
            ) : (
              <span className="group inline-flex shrink-0 justify-center items-center size-9">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </span>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default Theme;
