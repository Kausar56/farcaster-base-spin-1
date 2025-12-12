import Modal from "@/components/common/Modal";
import { useFrame } from "@/components/farcaster-provider";
import { quickAuth } from "@farcaster/miniapp-sdk";
import { useMutation } from "@tanstack/react-query";
import { ArrowBigRight, Coins, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Abi, Chain, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";
import ClaimBtn from "./ClaimBtn";

const ClaimAirdropDialog = ({
  contract,
}: {
  contract: { address: `0x${string}`; abi: Abi; chain: Chain };
}) => {
  const { context, actions } = useFrame();
  const { address, chainId } = useAccount();
  const { address: contractAddress, abi } = contract;

  const {
    data: isClaimed,
    refetch: refetchIsClaimed,
    isLoading: isClaimedLoading,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "claimedFid",
    args: context ? [BigInt(context?.user?.fid)] : undefined,
  });
  const { data: fidEpoch, isLoading: loadingFidEpoch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "fidEpoch",
  });
  const { data: maxEpoch, isLoading: loadingMaxEpoch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "MAX_FIDEPOCH",
  });
  const { data: isPaused, isLoading: loadingIsPaused } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "paused",
  });

  const { mutateAsync: getSignature, isPending: signaturePending } =
    useMutation({
      mutationFn: async () => {
        if (!quickAuth || !address) {
          throw new Error("QuickAuth is not available");
        }
        const { token } = await quickAuth.getToken();
        const res = await fetch("/api/auth/signature/drop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userAddress: address,
            contract: contract.address,
          }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => null);
          throw new Error(text || `Request failed with status ${res.status}`);
        }

        // parse and return JSON so onSuccess receives the parsed object (with `success`)
        return (await res.json()) as {
          signature: string;
          fid: number;
          isSuccess: boolean;
        };
      },
    });
  const {
    writeContractAsync: claimDrop,
    isPending: claimPending,
    data,
  } = useWriteContract();
  const { isSuccess: isTxConfirmed } = useTransactionReceipt({
    hash: data,
    query: { enabled: !!data },
  });

  //   Extra variable for state showing
  const initialLoading =
    isClaimedLoading || loadingFidEpoch || loadingIsPaused || loadingMaxEpoch;
  const txLoading = signaturePending || claimPending;
  const totalClaimed = fidEpoch ? parseInt(fidEpoch.toString()) : 0;
  const maxClaimEpoch = maxEpoch ? parseInt(maxEpoch.toString()) : 0;
  const disableBtn =
    signaturePending ||
    claimPending ||
    !!isClaimed ||
    totalClaimed >= maxClaimEpoch ||
    initialLoading ||
    txLoading ||
    loadingFidEpoch;

  // Claim function
  const handleClaimDrop = async () => {
    try {
      const signatureData = await getSignature();
      const signature = signatureData?.signature;
      const userFid = signatureData?.fid;
      if (!signature || !userFid) {
        return;
      }
      await claimDrop(
        {
          address: contractAddress,
          abi: abi,
          functionName: "claimDrop",
          args: [BigInt(userFid), signature as `0x${string}`],
        },

        {
          onSuccess: () => {
            toast.success("Transaction submitted");
            handleAutoCast();
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Claim failed");
    }
  };

  useEffect(() => {
    if (isTxConfirmed) {
      refetchIsClaimed();
    }
  }, [isTxConfirmed]);

  const handleAutoCast = () => {
    actions?.composeCast({
      text: `🎉 I just claimed 0.2 $CELO from Base Spin Drop!

try it below 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });
  };

  return (
    <div className="bg-white border overflow-hidden relative rounded-2xl text-center max-w-md w-full shadow-xl">
      <div className="bg-primary text-white p-2">
        <div className="flex justify-center items-center gap-2 mb-1">
          <Coins className="w-5 h-5" />
          <h1 className="text-lg font-bold">Claim Free Airdrop</h1>
        </div>
        <p className="text-blue-100 text-sm text-center">
          0.2 $CELO For 500 Users
        </p>
      </div>

      <div className="p-2">
        {chainId === contract.chain.id && (
          <div className="text-center mb-2">
            <p className="text-xl font-bold text-gray-900 mb-1">
              {totalClaimed}/{maxClaimEpoch}
            </p>
          </div>
        )}
        <ClaimBtn
          chain={contract.chain}
          disabled={disableBtn}
          onClick={handleClaimDrop}
          className={`${
            disableBtn ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
          } px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg  transition-shadow`}
        >
          {initialLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Checking...
            </span>
          ) : totalClaimed >= maxClaimEpoch ? (
            "All Claimed"
          ) : isClaimed ? (
            "You'r Claimed"
          ) : txLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Claiming...
            </span>
          ) : (
            "Claim Now"
          )}
        </ClaimBtn>
      </div>

      <p className="text-xs text-black mb-2 font-semibold">
        Claim More Reward from{" "}
        <span
          className="font-bold text-blue-600 cursor-pointer underline"
          onClick={() => {
            actions?.openMiniApp({
              url: "https://farcaster.xyz/miniapps/SpHID4BP6Z3b/farstate-ai",
            });
          }}
        >
          Here
        </span>
      </p>
    </div>
  );
};

export default ClaimAirdropDialog;
