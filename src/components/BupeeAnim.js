import React, { useState, useRef, useEffect } from "react";

export default function BupeeAnim({ isRunning, isPaused }) {
  const [imageIndex, setImageIndex] = useState(0);
  const imageIntervalRef = useRef(null);

  const burpeeImages = [
    "/images/burpee_move_1.png",
    "/images/burpee_move_2.png",
    "/images/burpee_move_3.png",
    "/images/burpee_move_4.png",
    "/images/burpee_move_5.png",
  ];

  useEffect(() => {
    // isRunning이 true이고 isPaused가 false일 때만 애니메이션 실행
    if (isRunning && !isPaused) {
      imageIntervalRef.current = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % burpeeImages.length);
      }, 300);
    } else {
      // 그 외의 경우 인터벌 정리
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    }

    // 컴포넌트가 언마운트되거나 의존성이 변경될 때 인터벌 정리
    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, [isRunning, isPaused]); // isRunning과 isPaused가 변경될 때마다 useEffect 실행

  return (
    <div className="flex justify-center w-12">
      <img
        src={burpeeImages[imageIndex]}
        alt="Burpee Movement"
        className="w-auto h-16 mt-4"
      />
    </div>
  );
}
