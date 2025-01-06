import React, { useState, useEffect } from "react";

function CountdownDisplay({ countdown, isCritical, interval, isPaused }) {
  const [stackCount, setStackCount] = useState(0);

  const radius = 74; // 원의 반지름
  const circumference = 2 * Math.PI * radius; // 원의 둘레
  const strokeDashoffset = (stackCount / interval) * circumference;

  // countdown 값의 변화만 감지하여 stackCount 증가
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      setStackCount((prev) => prev + 1);
    }
    if (isPaused) {
      setStackCount(-1); //+1된 상태로 끝났기 때문에 오프셋을 줘야함
    }
  }, [countdown, isPaused]);

  return (
    <div className="relative w-1/2 flex justify-center items-center m-12">
      {/* SVG 원형 */}
      <svg
        className="absolute w-48 h-48 origin-center -rotate-90"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 배경 원 */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        {/* 진행 원 */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={isCritical || countdown === 1 ? "#ef4444" : "white"}
          strokeWidth="13"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={!isPaused ? strokeDashoffset : 0}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s linear",
          }}
        />
      </svg>

      {/* 숫자 */}
      <p
        className={`text-9xl font-bold text-center ${
          isCritical || countdown === 1 ? "text-red-500" : "text-white"
        }`}
      >
        {countdown !== null ? `${countdown}` : ""}
      </p>
    </div>
  );
}

export default CountdownDisplay;
