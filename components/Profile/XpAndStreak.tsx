import { contractAbi } from "@/abi/abi";
import React, { useEffect } from "react";
import { formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useTimeCountDown from "../Lottery/hooks/useTimeCountDown";
import useAuth from "../useAuth";
import useUpdateEarnedPrize from "../useUpdateEarnedPrize";
import toast from "react-hot-toast";

const XpAndStreak = () => {
  const { address } = useAccount();
  const { signMessage, isSigning } = useAuth();
  const { updateEarnedPrize } = useUpdateEarnedPrize();
  const { writeContractAsync, isPending, data } = useWriteContract();

  const { data: totalStreak, refetch: refetchTotalStreak } = useReadContract({
    address: contractAbi.claimPrize.address,
    abi: contractAbi.claimPrize.abi,
    functionName: "userGMCount",
    args: address ? [address] : undefined,
  });
  const { data: dailyClaimAmount, isLoading: dailyClaimAmountLoading } =
    useReadContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: "dailyClaimAmount",
    });

  const {
    data: isDailyClaimAvailable,
    isLoading: dailyClaimAvailableLoading,
    refetch: refetchDailyClaimAvailable,
  } = useReadContract({
    address: contractAbi.claimPrize.address,
    abi: contractAbi.claimPrize.abi,
    functionName: "isDailyClaimAvailable",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });
  const { formattedTime } = useTimeCountDown({
    timeLeft: isDailyClaimAvailable ? Number(isDailyClaimAvailable[1]) : 0,
  });

  const handleClaim = async () => {
    if (!dailyClaimAmount || dailyClaimAvailableLoading) return;
    const dailyClaiming = toast.loading("Signing...");
    const data = await signMessage({
      userAddress: address as `0x${string}`,
      amount: formatUnits(dailyClaimAmount, 18),
    });

    const signature = data?.signature;
    const nonce = data?.nonce;

    if (!signature || !nonce) {
      return;
    }
    try {
      toast.loading("Claiming...", { id: dailyClaiming });
      await writeContractAsync(
        {
          address: contractAbi.claimPrize.address,
          abi: contractAbi.claimPrize.abi,
          functionName: "dailyClaim",
          args: [nonce, signature as `0x${string}`],
        },
        {
          onSuccess: (data) => {
            toast.success("Daily streak success", { id: dailyClaiming });
            updateEarnedPrize("100");
          },
          onError: () => {
            toast.error("Daily streak error", { id: dailyClaiming });
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { isSuccess: isClaimSuccess, isLoading: confirming } =
    useWaitForTransactionReceipt({
      hash: data,
      confirmations: 1,
    });

  const isCanClaim = isDailyClaimAvailable && isDailyClaimAvailable[0];

  useEffect(() => {
    if (isClaimSuccess) {
      refetchDailyClaimAvailable();
      refetchTotalStreak();
    }
  }, [isClaimSuccess]);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-xl font-bold text-orange-500">{totalStreak} 🔥</p>

      <button
        disabled={!isCanClaim || confirming || isSigning}
        onClick={handleClaim}
        className={`${
          isPending || !isCanClaim || confirming || isSigning
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary hover:bg-blue-600 text-white"
        }  font-bold py-2 px-4 rounded-xl transition-all transform hover:scale-105 active:scale-95  shadow-lg`}
      >
        {isPending || confirming || isSigning
          ? "Claiming..."
          : isCanClaim
          ? "Daily GM"
          : formattedTime}
      </button>
    </div>
  );
};

export default XpAndStreak;
