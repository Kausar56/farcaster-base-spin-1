import { contractAbi } from "@/abi/abi";
import React, { useEffect } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

type DrawStatusState = {
  timeUntilDraw: number;
  drawTime: number;
  canDrawNow: boolean;
  participantCount: number;
  currentPot: string;
  totalPot: number;
  meetsMinimum: boolean;
  expectedWinners: number;
  estimatedPrizePerWinner: string;
};

const useGetDrawStatus = () => {
  const [drawStatus, setDrawStatus] = React.useState<DrawStatusState>({
    timeUntilDraw: 0,
    drawTime: 0,
    canDrawNow: false,
    participantCount: 0,
    currentPot: "0",
    totalPot: 0,
    meetsMinimum: false,
    expectedWinners: 0,
    estimatedPrizePerWinner: "0",
  });

  const { data: drawStatusData, isLoading: isLoadingDrawStatus } =
    useReadContract({
      address: contractAbi.DailyLottery.address as `0x${string}`,
      abi: contractAbi.DailyLottery.abi,
      functionName: "getDrawStatus",
    });

  useEffect(() => {
    if (drawStatusData && Array.isArray(drawStatusData)) {
      const timeUntilDraw = Number(drawStatusData[0] ?? 0);
      const drawTime = Number(drawStatusData[1] ?? 0);
      const canDrawNow = Boolean(drawStatusData[2]);
      const participantCount = Number(drawStatusData[3] ?? 0);
      const currentPot = BigInt(drawStatusData[4] ?? 0);
      const totalPot = BigInt(drawStatusData[5] ?? 0);
      const meetsMinimum = Boolean(drawStatusData[6]);
      const expectedWinners = Number(drawStatusData[7] ?? 0);
      const estimatedPrizePerWinner = BigInt(drawStatusData[8] ?? 0);

      const currentPotETH = formatEther(currentPot);
      const estimatedPrizeETH = formatEther(estimatedPrizePerWinner);
      const totalPotETH = parseFloat(formatEther(totalPot));

      setDrawStatus({
        timeUntilDraw,
        drawTime,
        canDrawNow,
        participantCount,
        currentPot: currentPotETH,
        totalPot: totalPotETH,
        meetsMinimum,
        expectedWinners,
        estimatedPrizePerWinner: estimatedPrizeETH,
      });
    }
  }, [drawStatusData]);

  return { ...drawStatus, isLoadingDrawStatus };
};

export default useGetDrawStatus;
