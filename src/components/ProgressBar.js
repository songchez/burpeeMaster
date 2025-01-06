import React from "react";
import BupeeAnim from "./BupeeAnim";

function ProgressBar({
  currentRound,
  count,
  isCompleted,
  isRunning,
  isPaused,
}) {
  const progressPercentage = (currentRound / count) * 100;
  const isCritical = progressPercentage >= 85;

  return (
    <div className="w-1/2 p-4 border-2 border-white rounded shadow-md shadow-gray-700 mb-6 mt-2">
      <p
        className={`flex justify-center text-lg ${
          isCompleted
            ? "text-green-500"
            : isCritical
            ? "text-red-500"
            : "text-white"
        }`}
      >
        <strong className="text-3xl">
          🔥 {count}개 중 {currentRound}개 완료 🔥
        </strong>
      </p>
      <div className="flex justify-center pt-5">
        <div className="progress-bar w-full bg-zinc-600 h-16 rounded mt-5">
          <div
            className={`h-16 rounded ${
              isCompleted
                ? "bg-green-500"
                : isCritical
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <BupeeAnim isPaused={isPaused} isRunning={isRunning} />
      </div>
    </div>
  );
}

export default ProgressBar;
