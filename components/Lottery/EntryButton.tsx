import { contractAbi } from "@/abi/abi";
import { Zap } from "lucide-react";
import React from "react";
import { formatEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const EntryButton = () => {
  const { address } = useAccount();

  const { data: userEntered, refetch: refetchUserEntered } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "hasEntered",
    args: [address as `0x${string}`],
  });
  const { data: entryFee, isLoading: isLoadingEntryFee } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "entryFee",
  });

  const { writeContractAsync, isPending: isEntering } = useWriteContract();

  const handleEnter = async () => {
    try {
      await writeContractAsync({
        address: contractAbi.DailyLottery.address as `0x${string}`,
        abi: contractAbi.DailyLottery.abi,
        functionName: "enter",
        value: entryFee,
      });
      await refetchUserEntered();
    } catch (error) {
      console.error("Error entering lottery:", error);
    }
  };
  return (
    <>
      {userEntered ? (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-2">
            <Zap className="w-5 h-5" />
            You're In!
          </div>
          <p className="text-sm text-gray-600">Good luck in the draw!</p>
        </div>
      ) : (
        <>
          <button
            onClick={handleEnter}
            disabled={isEntering || isLoadingEntryFee}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isEntering || isLoadingEntryFee
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            {isEntering ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                Entering...
              </span>
            ) : (
              `Enter With ${entryFee ? formatEther(entryFee) : "0"} ETH`
            )}
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">
            One entry per address per round
          </p>
        </>
      )}
    </>
  );
};

export default EntryButton;
