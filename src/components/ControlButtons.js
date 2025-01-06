import React from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

function ControlButtons({
  isCompleted,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onStop,
}) {
  return (
    <div className="flex gap-4">
      {!isCompleted && (
        <>
          <button
            onClick={onStart}
            className="btn btn-success flex items-center gap-2"
            disabled={isRunning && !isPaused}
          >
            <FaPlay /> {isPaused ? "다시 시작" : "시작"}
          </button>
          <button
            onClick={onPause}
            className="btn btn-warning flex items-center gap-2"
            disabled={!isRunning || isPaused}
          >
            <FaPause /> 일시정지
          </button>
        </>
      )}
      <button
        onClick={onStop}
        className={`btn ${
          isCompleted ? "btn-success" : "btn-error"
        } flex items-center gap-2`}
      >
        <FaStop /> {isCompleted ? "처음으로" : "중지"}
      </button>
    </div>
  );
}

export default ControlButtons;
