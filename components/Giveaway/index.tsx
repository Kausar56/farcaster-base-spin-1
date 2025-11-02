import { contractAbi } from "@/abi/abi";
import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useFrame } from "../farcaster-provider";
import ClaimGiveaway from "./ClaimGiveaway";
import { useMutation } from "@tanstack/react-query";

const Giveaway = () => {
  const { context } = useFrame();
  const { address, isConnected } = useAccount();
  const [show, setShow] = useState(false);
  const { data: isPaused } = useReadContract({
    address: contractAbi.Giveaway.address as `0x${string}`,
    abi: contractAbi.Giveaway.abi,
    functionName: "paused",
  });
  const { data: isClaimed } = useReadContract({
    address: contractAbi.Giveaway.address as `0x${string}`,
    abi: contractAbi.Giveaway.abi,
    functionName: "claimedFid",
    args: context?.user?.fid ? [BigInt(context.user.fid)] : undefined,
  });

  const {
    mutate: signMessage,
    isPending: isSigning,
    data: signMessageData,
    isSuccess: isSignSuccess,
  } = useMutation({
    mutationFn: async ({
      userAddress,
      username,
    }: {
      userAddress: `0x${string}`;
      username: string;
    }) => {
      if (isPaused && isClaimed) return;
      const res = await fetch("/api/auth/signature/giveaway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress,
          username,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      return (await res.json()) as {
        signature: string;
        nonce: bigint;
        isSuccess: boolean;
      };
    },
  });

  useEffect(() => {
    const username = context?.user?.username;
    if (
      !isPaused &&
      !isClaimed &&
      isConnected &&
      address &&
      username &&
      !signMessageData
    ) {
      signMessage({ userAddress: address, username });
    }
  }, [address, isConnected, context, isPaused, isClaimed, signMessageData]);

  useEffect(() => {
    if (signMessageData && isSignSuccess) {
      setShow(true);
    }
  }, [signMessageData, isSignSuccess]);
  return (
    show &&
    signMessageData && (
      <ClaimGiveaway setShow={setShow} signature={signMessageData?.signature} />
    )
  );
};

export default Giveaway;
