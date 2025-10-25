import { contractAbi } from "@/abi/abi";
import React, { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

type LotteryStatusState = {
  currentRound: number;
  currentEntryFee: string;
  currentDrawInterval: number;
  currentCooldownPeriod: number;
  inCooldown: boolean;
  cooldownEndsAt: number;
  isPaused: boolean;
};

const useGetLotteryStatus = () => {
  const [lotteryStatus, setLotteryStatus] = useState<LotteryStatusState>({
    currentRound: 0,
    currentEntryFee: "0",
    currentDrawInterval: 0,
    currentCooldownPeriod: 0,
    inCooldown: false,
    cooldownEndsAt: 0,
    isPaused: false,
  });
  const { data: lotteryStatusData, isLoading: isLoadingLotteryStatus } =
    useReadContract({
      address: contractAbi.DailyLottery.address as `0x${string}`,
      abi: contractAbi.DailyLottery.abi,
      functionName: "getLotteryStatus",
    });

  useEffect(() => {
    if (lotteryStatusData && Array.isArray(lotteryStatusData)) {
      const currentRound = Number(lotteryStatusData[0] ?? 0);
      const currentEntryFee = BigInt(lotteryStatusData[1] ?? 0);
      const currentDrawInterval = Number(lotteryStatusData[2] ?? 0);
      const currentCooldownPeriod = Number(lotteryStatusData[3] ?? 0);
      const inCooldown = Boolean(lotteryStatusData[4]);
      const cooldownEndsAt = Number(lotteryStatusData[5] ?? 0);
      const isPaused = Boolean(lotteryStatusData[6]);

      const currentEntryFeeEth = formatEther(currentEntryFee);

      setLotteryStatus({
        currentRound,
        currentEntryFee: currentEntryFeeEth,
        currentDrawInterval,
        currentCooldownPeriod,
        inCooldown,
        cooldownEndsAt,
        isPaused,
      });
    }
  }, [lotteryStatusData]);

  return { ...lotteryStatus, isLoadingLotteryStatus };
};

export default useGetLotteryStatus;
