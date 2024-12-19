import React, { useState, useEffect } from "react";

interface QuizTimerProps {
  totalTime: number; 
  onTimeUp: () => void; 
}

const QuizTimer: React.FC<QuizTimerProps> = ({ totalTime, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState<number>(totalTime * 60);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, [remainingTime, onTimeUp]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-customGreen shadow-lg">
      <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-red-500">
          {formatTime(remainingTime)}
        </span>
      </div>
    </div>
  );
};

export default QuizTimer;
