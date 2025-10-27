import { contractAbi } from "@/abi/abi";
import React from "react";
import { useReadContract } from "wagmi";

const useContractState = () => {
  const { data: isSpinPaused, isLoading: isLoadingSpinPaused } =
    useReadContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: "paused",
    });
  const { data: isLotteryPaused, isLoading: isLoadingLotteryPaused } =
    useReadContract({
      address: contractAbi.DailyLottery.address,
      abi: contractAbi.DailyLottery.abi,
      functionName: "paused",
    });
  return {
    isSpinPaused,
    isLotteryPaused,
    isLoadingLotteryPaused,
    isLoadingSpinPaused,
  };
};

export default useContractState;
