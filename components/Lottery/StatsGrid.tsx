import React from "react";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import { Coins, Users } from "lucide-react";

const StatsGrid = () => {
  const { participantCount, currentPot, meetsMinimum, totalPot } =
    useGetDrawStatus();
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total Participants */}
      <div className="bg-white rounded-xl px-4 py-2 shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs text-gray-600">Participants</span>
        </div>
        <div className="text-lg font-bold text-gray-800">
          {participantCount}
        </div>
        {meetsMinimum ? (
          <div className="text-xs text-green-600 mt-1">✓ Min reached</div>
        ) : (
          <div className="text-xs text-orange-600 mt-1">
            Need {5 - participantCount} more
          </div>
        )}
      </div>

      {/* Total Pot */}
      <div className="bg-white rounded-xl px-4 py-2 shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Coins className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs text-gray-600">Total Pot</span>
        </div>
        <div className="text-xl font-bold text-blue-600">
          <div className="text-lg font-bold text-gray-800">{totalPot}</div>
          <span className="text-xs text-gray-500 mt-1">ETH</span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
