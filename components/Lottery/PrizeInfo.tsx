import { Trophy } from "lucide-react";
import React from "react";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import { parse } from "path";
import useGetLotteryStatus from "./hooks/useGetLotteryStatus";
import { formatUnits } from "viem";

const PrizeInfo = () => {
  const { expectedWinners, estimatedPrizePerWinner, isLoadingDrawStatus } =
    useGetDrawStatus();
  const { currentEntryFee } = useGetLotteryStatus();
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-3 shadow-lg text-white">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-5 h-5" />
        <h3 className="font-semibold">Prize Breakdown</h3>
      </div>

      <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-100 mb-1">Winners</span>
          <span className="text-md font-bold">{expectedWinners}</span>
        </div>
        {/* <div className="h-px bg-white/20"></div> */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-100 mb-1">Prize Each</span>
          <span className="text-md font-bold">
            {parseInt(formatUnits(BigInt(estimatedPrizePerWinner), 18))} BXP
          </span>
        </div>
        {/* <div className="flex flex-col items-center">
          <div className="text-xs text-blue-100 mb-1">Potential ROI</div>
          <div className="text-md font-bold text-yellow-300">
            {currentEntryFee && estimatedPrizePerWinner
              ? (
                  ((parseFloat(estimatedPrizePerWinner) -
                    parseFloat(currentEntryFee)) /
                    parseFloat(currentEntryFee)) *
                  100
                ).toFixed(2)
              : 0}
            x
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PrizeInfo;
