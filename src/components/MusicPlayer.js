import React, { useState, useRef, useEffect, useCallback } from "react";

function MusicPlayer({ isRunning, isPaused }) {
  const [selectedTrack, setSelectedTrack] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeDuration = 700;

  // 음악 페이드인
  const fadeIn = useCallback(
    (audio) => {
      return new Promise((resolve) => {
        let volume = 0.0;
        audio.volume = volume;
        const interval = setInterval(() => {
          if (volume < 1.0) {
            volume += 0.05;
            audio.volume = Math.min(volume, 1.0);
          } else {
            clearInterval(interval);
            resolve();
          }
        }, fadeDuration / 20);
      });
    },
    [fadeDuration]
  );

  // 음악 페이드아웃
  const fadeOut = useCallback(
    (audio) => {
      return new Promise((resolve) => {
        let volume = audio.volume;
        const interval = setInterval(() => {
          if (volume > 0.0) {
            volume -= 0.05;
            audio.volume = Math.max(volume, 0.0);
          } else {
            clearInterval(interval);
            resolve();
          }
        }, fadeDuration / 20);
      });
    },
    [fadeDuration]
  );

  // preview듣고있을때 음악변경시 처리 : 선택음악 재생
  // handleAudioTransition, startPreview, stopPreview, changeMusicPreview
  const handleAudioTransition = useCallback(
    async (newTrack) => {
      const audio = audioRef.current;

      if (audio && !audio.paused) {
        await fadeOut(audio); // 현재 음악을 페이드 아웃
        audio.pause();
        audio.currentTime = 0;
      }

      if (newTrack) {
        audio.src = newTrack; // 새로운 트랙 설정
        await fadeIn(audio); // 새로운 음악 페이드 인
        audio.play();
      }
    },
    [fadeIn, fadeOut]
  );
  const startPreview = useCallback(async () => {
    if (!selectedTrack) return;
    setIsPreview(true);
    await handleAudioTransition(selectedTrack);
  }, [selectedTrack, handleAudioTransition]);
  const stopPreview = useCallback(async () => {
    setIsPreview(false);
    const audio = audioRef.current;
    if (audio) {
      await fadeOut(audio);
      audio.pause();
      audio.currentTime = 0;
    }
  }, [fadeOut]);
  const changeMusicPreview = useCallback(
    async (newTrack) => {
      setSelectedTrack(newTrack);
      if (isPreview) {
        await handleAudioTransition(newTrack);
      }
    },
    [handleAudioTransition, isPreview]
  );

  // 운동 시작과 종료시 음악재생
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
    { name: "CineMetrix", file: "musics/Cinematic Workout.mp3" },
    { name: "CyberPunk", file: "musics/Cyberpunk Sport EDM.mp3" },
    {
      name: "Brand New Babe",
      file: "musics/Electro Sport Music by Alexi Action.mp3",
    },
    {
      name: "Up Energetic",
      file: "musics/Energetic EDM Festival by Infraction.mp3",
    },
    { name: "Training Day", file: "musics/Rock Fitness.mp3" },
    { name: "Sport Beat", file: "musics/Rock Sport Workout by Infraction.mp3" },
    {
      name: "The Race",
      file: "musics/Sport Rock Energy Racing by Infraction.mp3",
    },
    { name: "More Harder", file: "musics/Training Rock.mp3" },
  ];

  return (
    <div className="py-1 my-3 bg-white md:w-1/2 md:h-full">
      <div className="w-full shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-4">MUSIC</h1>

        {/* 음악 선택 */}
        <div className="form-control mb-6">
          <select
            id="track-select"
            className="select select-bordered w-full"
            value={selectedTrack}
            onChange={(e) => {
              changeMusicPreview(e.target.value);
            }}
          >
            <option value="">음악을 선택하세요</option>
            {tracks.map((track) => (
              <option key={track.file} value={track.file}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        <audio ref={audioRef} preload="auto" />

        {/* 컨트롤 버튼 */}
        <div className="flex justify-center">
          {isPreview && (
            <button className="btn btn-warning w-full" onClick={stopPreview}>
              미리듣기 중지
            </button>
          )}
          {!isPreview && !isPlaying && (
            <button className="btn btn-primary w-full" onClick={startPreview}>
              미리듣기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
