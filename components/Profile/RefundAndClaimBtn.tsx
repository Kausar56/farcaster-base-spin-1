import { contractAbi } from "@/abi/abi";
import { Box } from "lucide-react";
import React, { useMemo } from "react";
import { formatEther, formatUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import useUpdateEarnedPrize from "../useUpdateEarnedPrize";
import toast from "react-hot-toast";

const RefundAndClaimBtn = () => {
  const { address } = useAccount();
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();
  const { updateEarnedPrize } = useUpdateEarnedPrize();
  const {
    data: pendingPrize,
    refetch,
    isLoading,
    isFetching,
  } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "checkPendingPrize",
    args: [address as `0x${string}`],
  });

  const handleClaimPrize = async () => {
    try {
      const claimBXPToast = toast.loading("Claiming...");
      await writeContractAsync(
        {
          address: contractAbi.DailyLottery.address,
          abi: contractAbi.DailyLottery.abi,
          functionName: "withdrawPrize",
        },
        {
          onSuccess: () => {
            toast.success("Successfully Claimed", { id: claimBXPToast });
            refetch();
            if (pendingPrize) {
              updateEarnedPrize(formatUnits(pendingPrize[0], 18));
            }
          },
          onError: () => {
            toast.error("Claim failed", { id: claimBXPToast });
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isNotClaimed = useMemo(() => {
    return pendingPrize && parseFloat(pendingPrize[0].toString()) > 0;
  }, [pendingPrize]);
  return (
    isNotClaimed &&
    pendingPrize && (
      <div
        className={`w-full space-y-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl px-3 py-2 shadow-xl text-white`}
      >
        <div className="flex items-center gap-2 mb-1">
          <Box className="w-5 h-5 animate-bounce" />
          <h3 className="font-bold text-sm">Claim your rewards 🎉!</h3>
        </div>

        <button
          disabled={isPending || isLoading || isFetching}
          onClick={handleClaimPrize}
          className=" w-full bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full"
        >
          {isSuccess
            ? "Claimed 🎉"
            : isPending
            ? "Claiming..."
            : `Claim ${
                parseInt(formatUnits(pendingPrize[0], 18)) ?? BigInt(0)
              } BXP`}
        </button>
      </div>
    )
  );
};

export default RefundAndClaimBtn;
