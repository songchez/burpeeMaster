import { useState, useRef } from "react";

function useWorkoutTimer() {
  const [count, setCount] = useState(10);
  const [interval, setIntervalTime] = useState(5);
  const [currentRound, setCurrentRound] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [readyText, setReadyText] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const intervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const readySoundRef = useRef(new Audio("/ready_fight.mp3"));
  const bellSoundRef = useRef(new Audio("/bellsound.mp3"));

  const playSound = (audioRef) => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current.play().catch((err) => {
      console.error("Audio play error:", err);
    });
  };

  const startIntervalCountdown = () => {
    let countdownValue = interval;
    setCountdown(countdownValue);
    clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      countdownValue -= 1;
      setCountdown(countdownValue);
      if (countdownValue <= 0) {
        clearInterval(countdownIntervalRef.current);
        setCountdown(null);
      }
    }, 1000);
  };

  const startReadyFightSequence = (callback) => {
    setReadyText("Ready");
    playSound(readySoundRef);

    setTimeout(() => {
      setReadyText("Fight");

      setTimeout(() => {
        setReadyText(null);
        callback();
      }, 2000);
    }, 2000);
  };

  const startWorkout = () => {
    if (isRunning && !isPaused) return;

    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);

    startReadyFightSequence(() => {
      startIntervalCountdown();
      intervalRef.current = setInterval(() => {
        setCurrentRound((prevRound) => {
          if (prevRound + 1 >= count) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsCompleted(true);
            playSound(bellSoundRef);
            return prevRound + 1;
          }
          startIntervalCountdown();
          playSound(bellSoundRef);
          return prevRound + 1;
        });
      }, interval * 1000);
    });
  };

  const pauseWorkout = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);
    setIsPaused(true);
  };

  const stopWorkout = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);
    if (readySoundRef.current) readySoundRef.current.pause();
    if (bellSoundRef.current) bellSoundRef.current.pause();
    setIsRunning(false);
    setIsPaused(false);
    setCountdown(null);
    setReadyText(null);
    setCurrentRound(0);
    setIsCompleted(false);
  };

  return {
    count,
    interval,
    currentRound,
    isRunning,
    isPaused,
    countdown,
    readyText,
    isCompleted,
    setCount,
    setIntervalTime,
    startWorkout,
    pauseWorkout,
    stopWorkout,
  };
}

export default useWorkoutTimer;
