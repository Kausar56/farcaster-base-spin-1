import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import { useAccount, useReadContract } from "wagmi";
import { contractAbi } from "@/abi/abi";
import DailyStreakModal from "./DailyStreakModal";
import { formatUnits } from "viem";

const DailyStreak = () => {
  const { address } = useAccount();
  const { signMessage, signMessageData } = useAuth();
  const [show, setShow] = useState(false);

  const { data: dailyClaimAmount, isLoading: dailyClaimAmountLoading } =
    useReadContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: "dailyClaimAmount",
    });

  const { data: isDailyClaimAvailable, isLoading: dailyClaimAvailableLoading } =
    useReadContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: "isDailyClaimAvailable",
      args: [address as `0x${string}`],
      query: { enabled: !!address },
    });

  useEffect(() => {
    if (
      !isDailyClaimAvailable ||
      dailyClaimAvailableLoading ||
      !address ||
      !dailyClaimAmount ||
      dailyClaimAmountLoading
    ) {
      return;
    }
    const claimAvailable = isDailyClaimAvailable[0];
    if (!claimAvailable) return;

    signMessage({
      userAddress: address,
      amount: formatUnits(dailyClaimAmount, 18).toString(),
    });
  }, [
    isDailyClaimAvailable,
    dailyClaimAvailableLoading,
    address,
    dailyClaimAmount,
    dailyClaimAmountLoading,
  ]);

  useEffect(() => {
    if (signMessageData) {
      setShow(true);
    }
  }, [signMessageData]);
  return (
    show &&
    signMessageData && (
      <DailyStreakModal setShow={setShow} signMessageData={signMessageData} />
    )
  );
};

export default DailyStreak;
