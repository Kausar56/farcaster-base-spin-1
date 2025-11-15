import React, { useState, useEffect } from "react";
import {
  Wallet,
  Check,
  ExternalLink,
  Gift,
  Zap,
  Trophy,
  Users,
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

// Contract configuration
const CONTRACT_CONFIG = contractAbi.PixelCatNFT;

const MAX_SUPPLY = 10000;
const MINT_PRICE = "0.0003";

const NFTMintPage = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  // Read contract data
  const { data: totalSupply } = useReadContract({
    address: CONTRACT_CONFIG.address as `0x${string}`,
    abi: CONTRACT_CONFIG.abi,
    functionName: "totalSupply",
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
      args: [BigInt(1)],
      value: parseEther(MINT_PRICE),
    });
  };

  const supply = totalSupply ? Number(totalSupply) : 0;
  const canMint = canMintData ?? true;
  const userMintCount = mintedCount ? Number(mintedCount) : 0;
  const progress = (supply / MAX_SUPPLY) * 100;
  const isLoading = isMintLoading || isTransactionLoading;

  return (
    <div className="max-w-md mx-auto rounded-2xl mb-16">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4">
        {/* NFT Preview */}
        <div className="p-4 flex items-center justify-center gap-4">
          <div className="flex-1 w-full bg-primary overflow-hidden aspect-square bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm flex items-center justify-center border-2 border-white border-opacity-20">
            <img src="/pixel-cat.png" />
          </div>
          <div className="flex-1">
            <h2 className="text-blue-600 font-bold text-3xl">Pixel Cat</h2>
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
              <span className="text-blue-500 font-bold">
                {supply} / {MAX_SUPPLY}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {MAX_SUPPLY - supply} remaining
            </p>
          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Price */}
            <div className="flex-1 bg-blue-50 flex flex-col justify-center items-center rounded-xl p-2">
              <span className="text-gray-600 font-medium">Price</span>
              <p className="text-md font-bold text-blue-500">
                {MINT_PRICE} ETH
              </p>
            </div>

            {/* Mint Limit Info */}
            <div className="flex-1 flex flex-col items-center bg-blue-50 rounded-xl p-2">
              <div className="text-gray-600 font-medium">Limit</div>
              <span className="text-md font-bold text-blue-500">
                <strong>1</strong>
              </span>
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
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
                  : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 active:scale-95"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Minting...</span>
                </>
              ) : !canMint ? (
                <span>Already Minted (1/1)</span>
              ) : showSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Minted!</span>
                </>
              ) : (
                <span>Mint NFT</span>
              )}
            </button>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Coming soon on{" "}
              <a href="#" className="text-blue-500 hover:underline">
                OpenSea
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMintPage;
