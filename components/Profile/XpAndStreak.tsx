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
  const { signMessage, signMessageData } = useAuth();
  const { updateEarnedPrize } = useUpdateEarnedPrize();
  const { writeContractAsync, isPending, data } = useWriteContract();

  const { data: totalStreak } = useReadContract({
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
    refetch,
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
    const signature = signMessageData?.signature;
    const nonce = signMessageData?.nonce;

    if (!signature || !nonce) {
      return;
    }
    try {
      const dailyClaiming = toast.loading("Claiming...");
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
    });

  const isCanClaim = isDailyClaimAvailable && isDailyClaimAvailable[0];

  useEffect(() => {
    if (isCanClaim && address && dailyClaimAmount) {
      signMessage({
        userAddress: address,
        amount: formatUnits(dailyClaimAmount, 18),
      });
    }
  }, [isCanClaim, address, dailyClaimAmount]);

  useEffect(() => {
    if (isClaimSuccess) {
      refetch();
    }
  }, [isClaimSuccess]);
  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-3 w-full shadow-lg">
      <div>
        <p className="text-blue-600 text-sm mb-1">Daily Streak</p>
        <p className="text-xl font-bold text-orange-500">
          {totalStreak?.toString()} 🔥
        </p>
      </div>

      <button
        disabled={!isCanClaim || confirming}
        onClick={handleClaim}
        className={`${
          isPending || !isCanClaim || confirming
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary hover:bg-blue-600 text-white"
        }  font-bold py-2 px-4 rounded-xl transition-all transform hover:scale-105 active:scale-95  shadow-lg`}
      >
        {isPending || confirming
          ? "Claiming..."
          : isCanClaim
          ? "Daily streak"
          : formattedTime}
      </button>
    </div>
  );
};

export default XpAndStreak;
