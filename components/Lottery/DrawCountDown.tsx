import React from "react";
import useTimeCountDown from "./hooks/useTimeCountDown";
import { Clock } from "lucide-react";
import useGetDrawStatus from "./hooks/useGetDrawStatus";

const DrawCountDown = () => {
  const { timeUntilDraw } = useGetDrawStatus();
  const { formattedTime, remaining } = useTimeCountDown({
    timeLeft: timeUntilDraw,
  });
  return (
    <div className="bg-white rounded-2xl px-6 py-2 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-800">Draw Countdown</h3>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-2 text-center">
        <div className="text-sm mb-1 opacity-90">Time Remaining</div>
        <div className="text-2xl font-bold font-mono tracking-wider mb-1">
          {remaining < 1 ? "Waiting..." : formattedTime}
        </div>
        <div className="text-xs opacity-75">HH:MM:SS</div>
      </div>
    </div>
  );
};

export default DrawCountDown;
