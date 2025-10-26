import { AlertCircle, TrendingUp } from "lucide-react";
import React from "react";

const RoundCancelled = () => {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white/30 p-3 rounded-full">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-xl">Round Cancelled</h3>
          <p className="text-orange-100 text-sm">Round #1</p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 mb-4">
        <div className="text-sm text-orange-100 mb-2">
          Minimum participants not met
        </div>
        <div className="text-lg font-semibold mb-3">Only 2 joined (need 5)</div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
          <TrendingUp className="w-5 h-5" />
          <div className="text-sm">
            <div className="font-semibold">Pot carried over to next round!</div>
            <div className="text-orange-100">
              Next round jackpot will be bigger 🎁
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-orange-100 text-center">
        Your entry fee has been returned or will be part of next round
      </div>
    </div>
  );
};

export default RoundCancelled;
