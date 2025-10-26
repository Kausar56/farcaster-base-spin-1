import { contractAbi } from "@/abi/abi";
import { Box } from "lucide-react";
import React, { useMemo } from "react";
import { formatEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const RefundAndClaimBtn = () => {
  const { address } = useAccount();
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();
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
      await writeContractAsync(
        {
          address: contractAbi.DailyLottery.address,
          abi: contractAbi.DailyLottery.abi,
          functionName: "withdrawPrize",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isNotClaimed = useMemo(() => {
    return pendingPrize && parseFloat(formatEther(pendingPrize[0])) > 0;
  }, [pendingPrize]);
  return (
    isNotClaimed &&
    pendingPrize && (
      <div
        className={`w-full bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-3 shadow-xl text-white`}
      >
        <div className="flex items-center gap-2 mb-1">
          <Box className="w-5 h-5" />
          <h3 className="font-bold text-sm">Claim pending prize & refund!</h3>
        </div>

        <button
          disabled={isPending || isLoading || isFetching}
          onClick={handleClaimPrize}
          className="mt-2 w-full bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full"
        >
          {isSuccess
            ? "Claimed"
            : isPending
            ? "Claiming..."
            : `Claim ${formatEther(pendingPrize[0] ?? BigInt(0))} ETH`}
        </button>
      </div>
    )
  );
};

export default RefundAndClaimBtn;
