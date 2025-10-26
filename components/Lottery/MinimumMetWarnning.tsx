import React from "react";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import { AlertCircle } from "lucide-react";

const MinimumMetWarning = () => {
  const { participantCount, currentPot, meetsMinimum } = useGetDrawStatus();
  return (
    <div className="bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-300 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-orange-500 p-3 rounded-full">
          <AlertCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-orange-800 text-md">Almost There!</h3>
          <p className="text-orange-600 text-xs">Need more participants</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-2 mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-600 text-sm">Current</span>
          <span className="text-xl font-bold text-orange-600">
            {participantCount}/{3}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500"
            style={{ width: `${(participantCount / 3) * 100}%` }}
          ></div>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">Need </span>
          <span className="text-xl font-bold text-orange-600">
            {3 - participantCount}
          </span>
          <span className="text-sm text-gray-600">
            {" "}
            more {3 - participantCount === 1 ? "person" : "people"}
          </span>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-2">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />

          <p className="text-orange-600 text-xs">
            If we don't reach {3} participants by draw time, the round will be
            cancelled and entry fee will refunded!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimumMetWarning;
