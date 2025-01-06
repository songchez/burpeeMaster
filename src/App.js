import React from "react";
import WorkoutSettings from "./components/WorkoutSettings";
import CountdownDisplay from "./components/CountdownDisplay";
import ProgressBar from "./components/ProgressBar";
import ControlButtons from "./components/ControlButtons";
import ReadyFightOverlay from "./components/ReadyFightOverlay";
import useWorkoutTimer from "./hooks/useWorkoutTimer";

function App() {
  const {
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
  } = useWorkoutTimer();

  const progressPercentage = (currentRound / count) * 100;
  const isCritical = progressPercentage >= 85;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative ${
        isCompleted
          ? "bg-green-100"
          : isCritical
          ? "bg-red-100"
          : isRunning
          ? "bg-black"
          : "bg-gray-100"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-8 ${
          isCompleted ? "text-green-500" : "text-red-500"
        }`}
      >
        {isCompleted ? (
          "운동 완료!"
        ) : (
          <img src="/logo.png" width={200} alt="logo" />
        )}
      </h1>

      <ReadyFightOverlay readyText={readyText} />

      {!isRunning && !isCompleted && (
        <WorkoutSettings
          count={count}
          interval={interval}
          onCountChange={setCount}
          onIntervalChange={setIntervalTime}
        />
      )}

      {isRunning && (
        <>
          <CountdownDisplay
            countdown={countdown}
            isCritical={isCritical}
            interval={interval}
            isPaused={isPaused}
          />
          <ProgressBar
            currentRound={currentRound}
            count={count}
            isCompleted={isCompleted}
            isRunning={isRunning}
            isPaused={isPaused}
          />
        </>
      )}

      <ControlButtons
        isCompleted={isCompleted}
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={startWorkout}
        onPause={pauseWorkout}
        onStop={stopWorkout}
      />
    </div>
  );
}

export default App;
