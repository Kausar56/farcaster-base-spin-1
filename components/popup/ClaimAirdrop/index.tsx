import { contractAbi } from "@/abi/abi";
import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import ClaimAirdropDialog from "./ClaimAirdropDialog";

const ClaimAirdrop = () => {
  const { address } = useAccount();
  const [show, setShow] = useState(false);

  const { data: hasUserClaimed, isLoading: isLoadingHasUserClaimed } =
    useReadContract({
      address: contractAbi.PixelCatHolderAirdrop.address as `0x${string}`,
      abi: contractAbi.PixelCatHolderAirdrop.abi,
      functionName: "hasUserClaimed",
      args: address ? [address] : undefined,
      query: { enabled: true },
    });

  const { data: isPaused, isLoading: isLoadingIsPaused } = useReadContract({
    address: contractAbi.PixelCatHolderAirdrop.address as `0x${string}`,
    abi: contractAbi.PixelCatHolderAirdrop.abi,
    functionName: "paused",
    query: { enabled: !!address },
  });

  useEffect(() => {
    const hasSeenDialog = JSON.parse(
      localStorage.getItem("hasSeenAirdropDialog") || "false"
    );
    if (
      !isLoadingHasUserClaimed &&
      hasUserClaimed !== undefined &&
      !isPaused &&
      !hasSeenDialog
    ) {
      setShow(!hasUserClaimed);
    }
  }, [isLoadingHasUserClaimed, hasUserClaimed, isPaused]);

  return <>{show && <ClaimAirdropDialog setShow={setShow} />}</>;
};

export default ClaimAirdrop;
