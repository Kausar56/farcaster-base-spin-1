import { AlertCircle, TrendingUp } from "lucide-react";
import React from "react";
import useGetDrawStatus from "./hooks/useGetDrawStatus";

const RoundCancelled = () => {
  const { participantCount } = useGetDrawStatus();
  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-3 shadow-xl text-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/30 p-3 rounded-full">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-md">Round Cancelled</h3>
          <p className="text-orange-100 text-xs">Round #1</p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 mb-2">
        <div className="text-xs text-orange-100 mb-2">
          Minimum participants not met
        </div>
        <div className="text-md font-semibold">
          Only {participantCount} joined (need 3)
        </div>
      </div>

      <div className="text-xs text-orange-100 text-center">
        Your entry fee has been refunded and claim it from profile section!
      </div>
    </div>
  );
};

export default RoundCancelled;
