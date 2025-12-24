import React, { useState, useEffect } from "react";
import {
  Wallet,
  Check,
  ExternalLink,
  Gift,
  Zap,
  Trophy,
  Users,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { contractAbi } from "@/abi/abi";
import { base } from "viem/chains";

// Contract configuration
const CONTRACT_CONFIG = contractAbi.ChristmasBox;

const MAX_SUPPLY = 333;
const MINT_PRICE = "0.0018";

const ChristmasBox = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [mintQuantity, setMintQuantity] = useState(1);

  const handleAddQuantity = () => {
    if (mintQuantity >= 5) return;
    setMintQuantity(mintQuantity + 1);
  };
  const handleReduceQuantity = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  // Read contract data
  const { data: totalSupply } = useReadContract({
    address: CONTRACT_CONFIG.address as `0x${string}`,
    abi: CONTRACT_CONFIG.abi,
    functionName: "totalSupply",
  });
  // Read contract data
  const { data: maxPerWallet } = useReadContract({
    address: CONTRACT_CONFIG.address as `0x${string}`,
    abi: CONTRACT_CONFIG.abi,
    functionName: "maxPerWallet",
  });

  const { data: canMintData, refetch: refetchCanMint } = useReadContract({
    address: CONTRACT_CONFIG.address as `0x${string}`,
    abi: CONTRACT_CONFIG.abi,
    functionName: "canMint",
    args: address ? [address] : undefined,
  });

  const { data: mintedCount } = useReadContract({
    address: CONTRACT_CONFIG.address as `0x${string}`,
    abi: CONTRACT_CONFIG.abi,
    functionName: "getMintedCount",
    args: address ? [address] : undefined,
  });

  // Write to contract
  const {
    data: mintData,
    writeContract: mint,
    isPending: isMintLoading,
  } = useWriteContract();

  // Wait for transaction
  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } =
    useWaitForTransactionReceipt({
      hash: mintData,
    });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isTransactionSuccess) {
      setShowSuccess(true);
      refetchCanMint();
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [isTransactionSuccess]);

  const handleConnect = async () => {
    const connector = connectors[0]; // MetaMask or first available
    if (connector) {
      connect({ connector });
    }
  };

  const handleMint = () => {
    mint({
      address: CONTRACT_CONFIG.address as `0x${string}`,
      abi: CONTRACT_CONFIG.abi,
      functionName: "mint",
      args: [BigInt(mintQuantity)],
      value: parseEther((parseFloat(MINT_PRICE) * mintQuantity).toString()),
    });
  };

  const supply = totalSupply ? Number(totalSupply) : 0;
  const canMint = canMintData ?? true;
  const userMintCount = mintedCount ? Number(mintedCount) : 0;
  const progress = (supply / MAX_SUPPLY) * 100;
  const isLoading = isMintLoading || isTransactionLoading;

  return (
    <div className="max-w-md mx-auto rounded-2xl mb-4">
      {/* Main Card */}
      <div className="christmas-card relative rounded-3xl shadow-xl overflow-hidden mb-4">
        {/* Ambient glow + ornaments */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-20 h-48 w-48 rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-24 h-48 w-48 rounded-full bg-rose-300/40 blur-3xl" />
          <div className="absolute top-6 right-6 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.7)] sparkle" />
          <div className="absolute top-14 right-12 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.7)] sparkle delay-200" />
          <div className="absolute bottom-8 left-8 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.7)] sparkle delay-500" />
        </div>
        {/* NFT Preview */}
        <div className="p-4 flex items-center justify-center gap-4">
          <div className="relative flex-1 w-full overflow-hidden aspect-square rounded-2xl backdrop-blur-sm flex items-center justify-center border-2 border-white border-opacity-30 box-frame">
            <div className="absolute inset-0 ribbon" />
            <div className="absolute inset-0 ring" />
            <img src="/box.png" className="relative z-10 float" />
            <div className="snow">
              <span style={{ "--d": "0s" } as React.CSSProperties} />
              <span style={{ "--d": "0.7s" } as React.CSSProperties} />
              <span style={{ "--d": "1.2s" } as React.CSSProperties} />
              <span style={{ "--d": "1.8s" } as React.CSSProperties} />
              <span style={{ "--d": "2.4s" } as React.CSSProperties} />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-rose-600 font-bold text-2xl">Christmas Box</h2>
            <p className="text-xs text-gray-700 font-semibold">
              Exclusive rewards and utilities for Holder
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Supply Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Minted</span>
              <span className="text-emerald-600 font-bold">
                {supply} / {MAX_SUPPLY}
              </span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 via-green-500 to-rose-500 h-3 rounded-full transition-all duration-500 shimmer"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {MAX_SUPPLY - supply} remaining
            </p>
          </div>
          <div className="flex justify-between items-center gap-4">
            {/* Price */}
            <div className="flex-1 bg-emerald-50 flex flex-col justify-center items-center rounded-xl p-2">
              <span className="text-gray-600 font-medium">Price</span>
              <p className="text-md font-bold text-emerald-600">
                {(parseFloat(MINT_PRICE) * mintQuantity).toFixed(4)} ETH
              </p>
            </div>

            {/* Mint Limit Info */}
            <div className="flex-1 flex flex-col items-center bg-rose-50 rounded-xl p-2">
              <div className="text-gray-600 font-medium">Limit</div>
              <span className="text-md font-bold text-rose-600">
                <strong>{maxPerWallet?.toString()}</strong>
              </span>
            </div>
          </div>
          {/* Select Quantity */}
          <div className="flex justify-between items-center gap-4 bg-emerald-50 p-2 rounded-xl">
            <div
              onClick={handleReduceQuantity}
              className="w-8 h-8 flex justify-center items-center text-gray-600 bg-emerald-100 rounded-full cursor-pointer select-none hover:scale-105 transition-transform"
            >
              <MinusIcon />
            </div>
            <div className="text-md font-bold text-emerald-600">
              {mintQuantity}
            </div>

            <div
              onClick={handleAddQuantity}
              className="w-8 h-8 flex justify-center items-center text-gray-600 bg-emerald-100 rounded-full cursor-pointer select-none hover:scale-105 transition-transform"
            >
              <PlusIcon />
            </div>
          </div>
          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 flex items-start space-x-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800">Mint Successful!</p>
                <p className="text-sm text-green-600">
                  Your NFT has been minted to your wallet.
                </p>
              </div>
            </div>
          )}
          {/* Connect/Mint Button */}
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-rose-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <button
              onClick={handleMint}
              disabled={isLoading || !canMint || showSuccess}
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all transform flex items-center justify-center space-x-2 shadow-lg ${
                isLoading || !canMint || showSuccess
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-500 to-emerald-500 text-white hover:scale-105 active:scale-95"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Minting...</span>
                </>
              ) : !canMint ? (
                <span>Already Minted (1/{maxPerWallet?.toString()})</span>
              ) : showSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Minted!</span>
                </>
              ) : (
                <span>Mint {mintQuantity} NFT</span>
              )}
            </button>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Minted{" "}
              <span className="text-emerald-600 hover:underline">
                {userMintCount} / {maxPerWallet?.toString()}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .christmas-card {
          background: linear-gradient(135deg, #fff5f7 0%, #f0fdf4 100%);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .box-frame {
          background: radial-gradient(
            circle at 50% 30%,
            rgba(255, 255, 255, 0.7),
            rgba(16, 185, 129, 0.08) 55%,
            rgba(244, 63, 94, 0.12) 100%
          );
        }
        .ribbon::before,
        .ribbon::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(244, 63, 94, 0.35) 35%,
            rgba(244, 63, 94, 0.65) 50%,
            rgba(244, 63, 94, 0.35) 65%,
            transparent 100%
          );
          opacity: 0.8;
        }
        .ribbon::after {
          transform: rotate(90deg);
        }
        .ring {
          border: 2px dashed rgba(16, 185, 129, 0.45);
          border-radius: 9999px;
          margin: 12%;
          animation: spin 18s linear infinite;
        }
        .float {
          animation: float 3.4s ease-in-out infinite;
        }
        .sparkle {
          animation: twinkle 2.4s ease-in-out infinite;
        }
        .sparkle.delay-200 {
          animation-delay: 0.2s;
        }
        .sparkle.delay-500 {
          animation-delay: 0.5s;
        }
        .snow span {
          position: absolute;
          top: -8px;
          left: 10%;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: snow 3.8s linear infinite;
          animation-delay: var(--d);
        }
        .snow span:nth-child(2) {
          left: 30%;
          width: 4px;
          height: 4px;
        }
        .snow span:nth-child(3) {
          left: 50%;
          width: 5px;
          height: 5px;
        }
        .snow span:nth-child(4) {
          left: 70%;
          width: 3px;
          height: 3px;
        }
        .snow span:nth-child(5) {
          left: 85%;
          width: 4px;
          height: 4px;
        }
        .shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.2s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes snow {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(110%);
            opacity: 0;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default ChristmasBox;
