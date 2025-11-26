import { contractAbi } from "@/abi/abi";
import { useMutation } from "@tanstack/react-query";
import { on } from "events";
import { Check, CheckCircle, Coins, Loader, Loader2, Zap } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const WarpletHolderAirdrop = () => {
  const { address } = useAccount();
  const [tokenIds, setTokenIds] = React.useState<string[] | null>(null);
  const [isHaveNft, setIsHaveNft] = React.useState<string | undefined>(
    undefined
  );
  const {
    writeContractAsync: claimAirdrop,
    data: claimAirdropData,
    isPending: isClaiming,
  } = useWriteContract();

  const fetchNFTs = async () => {
    const api_key = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
    if (!api_key || !address) {
      console.error("Alchemy API key & Address is not defined");
      return;
    }
    try {
      const response = await fetch(
        `https://base-mainnet.g.alchemy.com/nft/v3/${api_key}/getNFTsForOwner?owner=${address}&contractAddresses%5B%5D=${contractAbi.WarpletMonstarNft.address}&withMetadata=true&pageSize=100`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Error fetching NFTs");
      console.error("Error fetching NFTs:", error);
    }
  };

  const {
    mutate: fetchNFTsMutate,
    isPending: isMutating,
    error: mutationError,
  } = useMutation({
    mutationFn: fetchNFTs,
    onSuccess: (data) => {
      if (data && data.ownedNfts && data.ownedNfts.length > 0) {
        const tokenIds = data.ownedNfts.map((nft: any) => nft.tokenId);
        setTokenIds(tokenIds);
        console.log("Token IDs:", tokenIds);
        setIsHaveNft("yes");
      } else {
        setIsHaveNft("no");
      }
    },
  });

  const { data: claimableAmount, isLoading: isLoadingClaimableAmount } =
    useReadContract({
      address: contractAbi.WarpletMonstarAirdrop.address as `0x${string}`,
      abi: contractAbi.WarpletMonstarAirdrop.abi,
      functionName: "calculateClaimableAmount",
      args:
        address && tokenIds
          ? [address, tokenIds.map((id) => BigInt(id))]
          : undefined,
      query: { enabled: !!tokenIds && !!address },
    });

  const {
    data: canClaim,
    isLoading: isLoadingCanClaim,
    refetch: refetchCanClaim,
  } = useReadContract({
    address: contractAbi.WarpletMonstarAirdrop.address as `0x${string}`,
    abi: contractAbi.WarpletMonstarAirdrop.abi,
    functionName: "canClaimBatch",
    args:
      address && tokenIds
        ? [address, tokenIds.map((id) => BigInt(id))]
        : undefined,
    query: { enabled: !!tokenIds && !!address },
  });

  const { data: isPaused, isLoading: isLoadingIsPaused } = useReadContract({
    address: contractAbi.WarpletMonstarAirdrop.address as `0x${string}`,
    abi: contractAbi.WarpletMonstarAirdrop.abi,
    functionName: "paused",
  });
  const { data: userClaimCount, isLoading: isLoadingUserClaimCount } =
    useReadContract({
      address: contractAbi.WarpletMonstarAirdrop.address as `0x${string}`,
      abi: contractAbi.WarpletMonstarAirdrop.abi,
      functionName: "userClaimCount",
      args: address ? [BigInt(1), address as `0x${string}`] : undefined,
    });

  const handleClaim = async () => {
    try {
      if (!tokenIds) return;
      await claimAirdrop(
        {
          address: contractAbi.WarpletMonstarAirdrop.address as `0x${string}`,
          abi: contractAbi.WarpletMonstarAirdrop.abi,
          functionName: "claimMultipleNFTs",
          args: [tokenIds!.map((id) => BigInt(id))],
        },
        {
          onSuccess: () => {
            console.log("Airdrop claimed successfully!");
          },
        }
      );
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      toast.error("Error claiming airdrop");
    }
  };

  const { isSuccess: isClaimConfirmed, isLoading: isClaimConfirming } =
    useWaitForTransactionReceipt({
      hash: claimAirdropData,
      confirmations: 1,
    });

  useEffect(() => {
    if (isClaimConfirmed) {
      refetchCanClaim();
      toast.success("Airdrop claimed successfully!");
      console.log("Airdrop claim transaction confirmed!");
    }
  }, [isClaimConfirmed]);

  const bxpAirdropAmount = claimableAmount
    ? Number(claimableAmount[0]) / 1e18
    : 0;

  const canClaimBatch = canClaim
    ? (canClaim[0] as boolean[]).some((claimable) => claimable)
    : false;
  const loadingState =
    isLoadingIsPaused ||
    isLoadingClaimableAmount ||
    isLoadingCanClaim ||
    isLoadingUserClaimCount;

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-white p-3">
        <div className="flex justify-center items-center gap-2 mb-1">
          <Coins className="w-5 h-5" />
          <h1 className="text-lg font-bold">Weekly Airdrop</h1>
        </div>
        <p className="text-blue-100 text-sm text-center">
          Airdrop for Warplet Monster NFT Holders
        </p>
      </div>

      {loadingState ? (
        <div className="p-3 flex flex-col justify-center items-center">
          <Loader className="text-gray-600 animate-spin h-8 w-8" />
          <p className="text-gray-500 text-md text-center">Loading...</p>
        </div>
      ) : isPaused ? (
        <div className="p-3">
          <p className="text-gray-500 text-md text-center mb-1">
            Airdrop claim paused{" "}
          </p>
        </div>
      ) : (
        <div className="p-3">
          {/* Balance Display */}
          <div className="mb-4">
            {tokenIds ? (
              canClaimBatch ? (
                <div className="text-center mb-2">
                  <p className="text-green-600 text-sm mb-1">
                    You Are Eligible For
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {bxpAirdropAmount} BXP
                  </p>
                </div>
              ) : (
                <div className="text-center mb-2">
                  <p className="text-gray-500 text-sm mb-1">
                    You're already claimed
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {parseInt(userClaimCount?.toString() || "0") * 2000} BXP
                  </p>
                </div>
              )
            ) : isHaveNft === "no" ? (
              <div className="text-center mb-2">
                <p className="text-lg font-bold text-gray-700 mb-1">
                  Mint Watplet Monster to Eligible
                </p>
              </div>
            ) : (
              <div className="text-center mb-2">
                <p className="text-xlg font-bold text-gray-700 mb-1">
                  Check your eligibility
                </p>
              </div>
            )}
          </div>
          {/* {hasUserClaimed ? (
            <div className="inline-flex w-full justify-center items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-2">
              <Zap className="w-5 h-5" />
              Already Claimed
            </div>
          ) :  */}
          {tokenIds ? (
            canClaimBatch ? (
              <button
                onClick={() => handleClaim()}
                disabled={isMutating || isLoadingCanClaim}
                className="w-full py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isClaiming || isClaimConfirming ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isClaimConfirming ? "Confirming..." : "Claiming..."}
                  </span>
                ) : (
                  "Claim"
                )}
              </button>
            ) : (
              <div className="inline-flex w-full justify-center items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold mb-2">
                <Zap className="w-5 h-5" />
                Already Claimed
              </div>
            )
          ) : isHaveNft === "no" ? (
            <div className="inline-flex w-full justify-center items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold mb-2">
              <Zap className="w-5 h-5" />
              Not eligible
            </div>
          ) : (
            <button
              onClick={() => fetchNFTsMutate()}
              disabled={isMutating || isLoadingCanClaim}
              className="w-full py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isMutating || isLoadingCanClaim
                ? "Checking..."
                : "Check Eligibility"}
            </button>
          )}
          {/* Info */}
          <div className=" flex items-center justify-center gap-2 text-black  mt-2">
            <CheckCircle size={16} />
            <span className="text-xs font-medium">
              Mint multiple NFTs to increase your airdrop
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarpletHolderAirdrop;
