import React, { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits, maxUint256 } from "viem";
import { CheckCircle, Loader2, AlertCircle, Zap } from "lucide-react";
import { contractAbi } from "@/abi/abi";
import toast from "react-hot-toast";

// ERC20 ABI
const ERC20_ABI = contractAbi.ERC20_ABI.abi;

// BXP Swap ABI
const SWAP_ABI = contractAbi.FlexibleBXPSwap.abi;

// Contract addresses (replace with actual addresses)
const BXP_TOKEN_ADDRESS = contractAbi.BXPToken.address;
const SWAP_CONTRACT_ADDRESS = contractAbi.FlexibleBXPSwap.address;

export default function FlexibleBXPSwap() {
  const { address, isConnected } = useAccount();
  const [pendingSwap, setPendingSwap] = useState(false);

  // Read BXP balance
  const { data: bxpBalance } = useReadContract({
    address: contractAbi.BXPToken.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Read allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: BXP_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, SWAP_CONTRACT_ADDRESS] : undefined,
    query: { enabled: !!address },
  });

  // Read minimum swap amount
  const { data: minSwapAmount } = useReadContract({
    address: SWAP_CONTRACT_ADDRESS,
    abi: SWAP_ABI,
    functionName: "minSwapAmount",
    query: { enabled: true },
  });
  // Read bxp to usdt rate
  const { data: bxpToUsdtRate } = useReadContract({
    address: SWAP_CONTRACT_ADDRESS,
    abi: SWAP_ABI,
    functionName: "bxpToUsdtRate",
    query: { enabled: true },
  });

  // Approve
  const {
    data: approveHash,
    writeContractAsync: approve,
    isPending: isApproving,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  // Swap
  const {
    data: swapHash,
    writeContractAsync: swap,
    isPending: isSwapping,
    reset: resetSwap,
  } = useWriteContract();

  const { isLoading: isSwapConfirming, isSuccess: isSwapSuccess } =
    useWaitForTransactionReceipt({ hash: swapHash });

  // Check if balance meets minimum
  const canSwap = () => {
    if (!bxpBalance || !minSwapAmount) return false;
    return bxpBalance >= minSwapAmount;
  };

  // Check if approved
  const isApproved = () => {
    if (!allowance || !bxpBalance) return false;
    return allowance >= bxpBalance;
  };

  // Toast ID
  let swapToast: string;

  // Handle approve
  const handleApprove = async () => {
    try {
      setPendingSwap(true);
      swapToast = toast.loading("Approving...");
      await approve({
        address: BXP_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [SWAP_CONTRACT_ADDRESS, maxUint256],
      });
    } catch (error) {
      console.error("Approve failed:", error);
      setPendingSwap(false);
      toast.error("Approving failed", { id: swapToast });
    }
  };

  // Handle swap
  const handleSwap = async () => {
    try {
      if (!bxpBalance) return;
      toast.loading("Swapping...", { id: swapToast });
      await swap({
        address: SWAP_CONTRACT_ADDRESS,
        abi: SWAP_ABI,
        functionName: "swapBXPForUSDT",
        args: [bxpBalance],
      });
    } catch (error) {
      console.error("Swap failed:", error);
      toast.error("Swap failed", { id: swapToast });
    }
  };

  // Auto-swap after approval
  useEffect(() => {
    if (isApproveSuccess && pendingSwap) {
      refetchAllowance();
      setTimeout(() => {
        handleSwap();
        setPendingSwap(false);
      }, 500);
    }
  }, [isApproveSuccess, pendingSwap]);

  // Reset after swap success
  useEffect(() => {
    if (isSwapSuccess) {
      toast.success("Successfully swapped", { id: swapToast });
      setTimeout(() => {
        resetSwap();
      }, 3000);
    }
  }, [isSwapSuccess]);

  const getBXPAmount = () => {
    if (!bxpBalance) return "0";
    return parseInt(formatUnits(bxpBalance, 18));
  };

  const getUSDTAmount = () => {
    if (!bxpBalance) return "0.00";
    const bxp = parseFloat(formatUnits(bxpBalance, 18));
    return (bxp * 0.001).toFixed(2);
  };

  const getBxpToUsdtRate = () => {
    if (!bxpToUsdtRate) return "0.00";
    const rate = parseFloat(formatUnits(bxpToUsdtRate, 6));
    return rate.toFixed(3);
  };

  const isProcessing =
    isApproving || isApproveConfirming || isSwapping || isSwapConfirming;

  return (
    <div className="w-full max-w-md">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-6 py-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap size={28} />
            <h1 className="text-xl font-bold">Swap BXP</h1>
          </div>
          <p className="text-blue-100 text-sm">
            Instant Exchange • 1 BXP = {getBxpToUsdtRate()} USDT
          </p>
        </div>

        <div className="p-3">
          {/* Success Message */}
          {isSwapSuccess && (
            <div className="mb-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
              <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
              <div>
                <p className="text-green-700 font-bold text-lg">
                  Swap Successful!
                </p>
                <p className="text-green-600 text-sm">
                  USDT sent to your wallet
                </p>
              </div>
            </div>
          )}

          {/* Balance Display */}
          <div className="mb-6">
            <div className="text-center mb-2">
              <p className="text-gray-500 text-sm mb-1">Your BXP Balance</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {getBXPAmount()}
              </p>
              <p className="text-gray-400 text-sm">BXP</p>
            </div>

            {/* Rate Display */}
            <div className="bg-blue-50 rounded-xl p-2 border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">
                  You'll Receive:
                </span>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-500">
                    {getUSDTAmount()}
                  </p>
                  <span className="text-sm text-gray-500">USDT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          {!canSwap() ? (
            <div>
              <button
                disabled
                className="w-full py-4 rounded-xl font-bold text-lg bg-gray-200 text-gray-400 cursor-not-allowed mb-3"
              >
                Insufficient Balance
              </button>
              <p className="text-center text-sm text-gray-500">
                Minimum:{" "}
                {minSwapAmount ? formatUnits(minSwapAmount, 18) : "100"} BXP
                required
              </p>
            </div>
          ) : !isApproved() ? (
            <button
              onClick={handleApprove}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  {isApproving || isApproveConfirming
                    ? "Approving..."
                    : "Swapping..."}
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Approve & Swap All
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleSwap}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Swapping...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Swap All BXP
                </>
              )}
            </button>
          )}

          {/* Info */}
          {isApproved() && canSwap() && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">
                Ready to swap instantly
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Powered by BXP Swap • Secure & Instant
      </p>
    </div>
  );
}
