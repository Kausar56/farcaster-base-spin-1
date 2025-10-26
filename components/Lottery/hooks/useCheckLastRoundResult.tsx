import { contractAbi } from "@/abi/abi";
import React from "react";
import { useAccount, useReadContract } from "wagmi";

const useCheckLastRoundResult = () => {
  const { address } = useAccount();
  const { data: lastRoundResult, isLoading } = useReadContract({
    address: contractAbi.DailyLottery.address,
    abi: contractAbi.DailyLottery.abi,
    functionName: "checkLastRoundResult",
    args: [address as `0x${string}`],
  });

  const wasCancelled = lastRoundResult && lastRoundResult[3];
  return { wasCancelled };
};

export default useCheckLastRoundResult;
