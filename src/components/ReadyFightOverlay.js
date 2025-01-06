import React from "react";

function ReadyFightOverlay({ readyText }) {
  if (!readyText) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
      <p className="text-white text-6xl font-bold animate-pulse">{readyText}</p>
    </div>
  );
}

export default ReadyFightOverlay;
