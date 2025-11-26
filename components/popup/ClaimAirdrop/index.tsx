import { contractAbi } from "@/abi/abi";
import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import ClaimAirdropDialog from "./ClaimAirdropDialog";

const ClaimAirdrop = () => {
  const { address } = useAccount();
  const [show, setShow] = useState(false);

  const { data: isPaused, isLoading: isLoadingIsPaused } = useReadContract({
    address: contractAbi.PixelCatHolderAirdrop.address as `0x${string}`,
    abi: contractAbi.PixelCatHolderAirdrop.abi,
    functionName: "paused",
    query: { enabled: !!address },
  });

  useEffect(() => {
    const hasSeenDialog = JSON.parse(
      localStorage.getItem("hasSeenAirdrop") || "false"
    );
    if (!isPaused && !hasSeenDialog && !isLoadingIsPaused) {
      setShow(true);
    }
  }, [isPaused, isLoadingIsPaused]);

  return <>{show && <ClaimAirdropDialog setShow={setShow} />}</>;
};

export default ClaimAirdrop;
