import React from "react";

function WorkoutSettings({ count, interval, onCountChange, onIntervalChange }) {
  return (
    <div className="w-1/2 p-4 bg-white rounded shadow-lg mb-4">
      <div className="mb-4">
        <label className="block text-xl font-bold text-black mb-2">
          버피횟수
        </label>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => onCountChange(Number(e.target.value))}
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xl font-bold text-black mb-2">
          운동간격 (초)
        </label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
}

export default WorkoutSettings;
