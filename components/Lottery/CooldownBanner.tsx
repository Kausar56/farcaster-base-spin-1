import { Timer } from "lucide-react";
import React from "react";
import useGetLotteryStatus from "./hooks/useGetLotteryStatus";
import useTimeCountDown from "./hooks/useTimeCountDown";

const CooldownBanner = () => {
  const { cooldownEndsAt, isLoadingLotteryStatus, inCooldown } =
    useGetLotteryStatus();
  const now = Math.floor(Date.now() / 1000);
  const { formattedTime, remaining } = useTimeCountDown({
    timeLeft: cooldownEndsAt - now,
  });

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-2xl px-6 py-2 shadow-lg text-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-white/30 p-3 rounded-full">
          <Timer className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Cooldown Period</h3>
          <p className="text-blue-50 text-sm">Next round starting soon...</p>
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center">
        <div className="text-sm mb-1 text-blue-100">Round starts in</div>
        <div className="text-2xl font-bold font-mono tracking-wider animate-pulse">
          {remaining < 1 ? "Waiting..." : formattedTime}
        </div>
      </div>
    </div>
  );
};

export default CooldownBanner;
