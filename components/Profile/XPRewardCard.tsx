import { contractAbi } from "@/abi/abi";
import { Loader2, Zap } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { formatUnits, maxUint256, parseUnits } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const XPRewardCard = ({
  price,
  amount,
  id,
}: {
  price: number;
  amount: number;
  id: number;
}) => {
  const { address } = useAccount();

  // BXP balance
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    token: contractAbi.BXPToken.address,
  });

  // Read current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: contractAbi.BXPToken.address,
    abi: contractAbi.ERC20_ABI.abi,
    functionName: "allowance",
    args: address ? [address, contractAbi.BXPSwap.address] : undefined,
    query: { enabled: !!address },
  });

  // Check if unlimited approval exists
  const hasUnlimitedApproval = () => {
    if (!allowance) return false;
    // Check if allowance is very high (unlimited approval)
    const minRequiredForAllPackages = parseUnits("10000", 18); // Largest package
    return allowance >= minRequiredForAllPackages;
  };

  // Approve tokens
  const {
    data: approveHash,
    writeContractAsync: approve,
    isPending: isApproving,
  } = useWriteContract();

  // Wait for approve transaction
  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  // Swap tokens
  const {
    data: swapHash,
    writeContractAsync: swap,
    isPending: isSwapping,
  } = useWriteContract();

  // Wait for swap transaction
  const { isLoading: isSwapConfirming, isSuccess: isSwapSuccess } =
    useWaitForTransactionReceipt({
      hash: swapHash,
    });

  // Handle approve
  const handleApprove = async () => {
    try {
      await approve({
        address: contractAbi.BXPToken.address,
        abi: contractAbi.ERC20_ABI.abi,
        functionName: "approve",
        args: [contractAbi.BXPSwap.address, maxUint256],
      });
    } catch (error) {
      toast.error("TX approving failed!");
      console.error("Approve failed:", error);
    }
  };

  // Handle swap
  const handleSwap = async () => {
    try {
      const swapToastId = toast.loading("Swapping...");
      await swap(
        {
          address: contractAbi.BXPSwap.address,
          abi: contractAbi.BXPSwap.abi,
          functionName: "swapBXPForUSDT",
          args: [BigInt(id)],
        },
        {
          onSuccess: () => {
            toast.success("Successfully swapped", { id: swapToastId });
          },
          onError: () => {
            toast.error("Failed to swap!", { id: swapToastId });
          },
        }
      );
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  // Handle click - approve or swap based on approval status
  const handlePackageClick = () => {
    if (hasUnlimitedApproval()) {
      handleSwap();
    } else {
      handleApprove();
    }
  };

  // Auto-swap after approval success
  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
      toast.success("TX approved!");
      // Small delay to ensure allowance is updated
      setTimeout(() => {
        handleSwap();
      }, 500);
    }
  }, [isApproveSuccess]);

  const isApproved = hasUnlimitedApproval();
  const isProcessing =
    isApproving || isApproveConfirming || isSwapping || isSwapConfirming;
  const isBalanceEnough =
    balance && parseFloat(formatUnits(balance.value, 18)) > price;
  return (
    <div className="bg-primary rounded-xl p-3 shadow-md border border-sky-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">{price} BXP</h3>
        <Zap className="text-white" size={18} />
      </div>

      <div className="bg-blue-400/50 rounded-lg p-2 mb-2">
        <div className="flex flex-col items-center justify-center">
          <div>
            <p className="text-yellow-300 text-lg font-bold">{amount} USDT</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => handlePackageClick()}
        disabled={isProcessing || balanceLoading || !isBalanceEnough}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          isApproved
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-sky-500 text-white hover:bg-sky-600"
        }`}
      >
        {balanceLoading ? (
          "Loading..."
        ) : !isBalanceEnough ? (
          "Not enough"
        ) : isProcessing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {isApproving || isApproveConfirming
              ? "Approving..."
              : "Swapping..."}
          </>
        ) : (
          "Swap"
        )}
      </button>
    </div>
  );
};

export default XPRewardCard;
