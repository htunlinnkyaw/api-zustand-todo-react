import React from "react";

const Loader = () => {
  const numbers = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <>
      {numbers.map((number) => (
        <div
          key={number}
          className="flex animate-pulse items-center w-full border border-gray-400 px-4 py-3 rounded"
        >
          <div className="h-5 bg-gray-200 rounded dark:bg-gray-700 w-6" />
          <div className="h-5 ms-2 bg-gray-300 rounded dark:bg-gray-600 w-full" />
          <div className="h-5 ms-2 bg-gray-300 rounded dark:bg-gray-600 w-24" />
        </div>
      ))}
    </>
  );
};

export default Loader;
