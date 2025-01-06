import React, { useState, useRef, useEffect, useCallback } from "react";

function MusicPlayer({ isRunning, isPaused }) {
  const [selectedTrack, setSelectedTrack] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeDuration = 2000; // 2초

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    let volume = 0.0;
    audio.volume = volume;
    const interval = setInterval(() => {
      if (volume < 1.0) {
        volume += 0.05;
        audio.volume = Math.min(volume, 1.0);
      } else {
        clearInterval(interval);
      }
    }, fadeDuration / 20);
    audio.play();
  }, []);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    let volume = audio.volume;
    const interval = setInterval(() => {
      if (volume > 0.0) {
        volume -= 0.05;
        audio.volume = Math.max(volume, 0.0);
      } else {
        clearInterval(interval);
        audio.pause();
        audio.currentTime = 0;
      }
    }, fadeDuration / 20);
  }, []);

  const startWorkout = useCallback(() => {
    if (!selectedTrack) return;
    setIsPlaying(true);
    fadeIn();
    audioRef.current.loop = true;
  }, [selectedTrack, fadeIn]);

  const stopWorkout = useCallback(() => {
    setIsPlaying(false);
    fadeOut();
    audioRef.current.loop = false;
  }, [fadeOut]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      startWorkout();
    } else {
      stopWorkout();
    }
  }, [isRunning, isPaused, startWorkout, stopWorkout]);

  const tracks = [
    {
      name: "Infraction - Chemicals",
      file: "musics/Infraction-Chemicals-pr.mp3",
    },
    {
      name: "Place To Hide",
      file: "musics/Infraction-MOKKA-Place-To-Hide-pr.mp3",
    },
    {
      name: "Brand New Babe",
      file: "musics/Infraction-Music-Brand-New-Babe-pr.mp3",
    },
    {
      name: "Rhythmic Boom",
      file: "musics/Infraction-Music-Rhythmic-Boom.mp3",
    },
    {
      name: "Training Day",
      file: "musics/Infraction-Training-Day-Main-Version-pr.mp3",
    },
    { name: "Sport Beat", file: "musics/Infraction-Sport-Beat-pr.mp3" },
  ];

  // 미리듣기 시작
  const startPreview = () => {
    if (!selectedTrack) return;
    setIsPreview(true);
    fadeIn();
  };

  // 미리듣기 종료
  const stopPreview = () => {
    setIsPreview(false);
    fadeOut();
  };

  return (
    <div className="py-1 my-3 bg-white">
      <div className="w-full shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-4">MUSIC</h1>

        {/* 음악 선택 */}
        <div className="form-control mb-6">
          <select
            id="track-select"
            className="select select-bordered w-full"
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
          >
            <option value="">음악을 선택하세요</option>
            {tracks.map((track) => (
              <option key={track.file} value={track.file}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        <audio ref={audioRef} src={selectedTrack} preload="auto" />

        {/* 컨트롤 버튼 */}
        <div className="flex justify-center">
          {!isPreview && !isPlaying && (
            <button className="btn btn-primary w-full" onClick={startPreview}>
              미리듣기
            </button>
          )}
          {isPreview && (
            <button className="btn btn-warning w-full" onClick={stopPreview}>
              미리듣기 중지
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
