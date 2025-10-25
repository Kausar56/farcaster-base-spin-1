import React, { useEffect, useState } from "react";

const useTimeCountDown = ({ timeLeft }: { timeLeft: number }) => {
  // Always call hooks in the same order — do not return early.
  // Initialize remaining to a non-negative number derived from timeLeft.
  const initial = Math.max(0, timeLeft ?? 0);
  const [remaining, setRemaining] = useState<number>(initial);

  // when the incoming prop changes, reset the remaining counter
  useEffect(() => {
    setRemaining(Math.max(0, timeLeft ?? 0));
  }, [timeLeft]);

  // decrement remaining every second; if remaining is 0 we don't start the interval
  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [remaining]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formattedTime = formatTime(remaining);
  return { formattedTime, remaining };
};

export default useTimeCountDown;
