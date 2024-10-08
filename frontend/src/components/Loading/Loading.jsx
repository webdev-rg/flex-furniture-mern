import React from "react";

export const Loading = () => {
  return (
    <div className="w-full h-full py-10 flex items-center justify-center">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};
