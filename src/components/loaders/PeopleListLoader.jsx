import React from "react";

const PeopleListLoader = () => {
  return (
    <>
      {Array(5)
        .fill()
        .map((_, index) => (
          <li key={index} className="pb-3 sm:pb-4">
            <div className="flex justify-between w-full items-center space-x-4 rtl:space-x-reverse animate-pulse">
              <div className="flex gap-2 flex-grow">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0 text-start">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-16 h-5 bg-gray-300 rounded"></div>
            </div>
          </li>
        ))}
    </>
  );
};

export default PeopleListLoader;
