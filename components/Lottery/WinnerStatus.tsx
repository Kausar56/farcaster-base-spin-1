import { contractAbi } from "@/abi/abi";
import { Frown, PartyPopper, User } from "lucide-react";
import React, { useMemo } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import { formatEther, formatUnits } from "viem";
import useUpdateEarnedPrize from "../useUpdateEarnedPrize";
import { useFrame } from "../farcaster-provider";

const WinnerStatus = () => {
  const { address } = useAccount();
  const { actions } = useFrame();
  const { data: winStatus } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "checkLastRoundResult",
    args: [address as `0x${string}`],
  });
  const {
    data: pendingPrize,
    refetch,
    isLoading,
  } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "checkPendingPrize",
    args: [address as `0x${string}`],
  });

  const { writeContractAsync, isPending } = useWriteContract();
  const { updateEarnedPrize } = useUpdateEarnedPrize();

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
            handleSharePost();
            if (pendingPrize) {
              updateEarnedPrize(formatUnits(pendingPrize[0], 18));
            }
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSharePost = () => {
    actions?.composeCast({
      text: `🎉 I just won ${
        pendingPrize ? pendingPrize[0].toString() : "ETH"
      } playing the Base Spin Lottery Game! 🚀

    Think you can beat my score? Try it now 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });
  };

  const isNotClaimed = useMemo(() => {
    return pendingPrize && parseFloat(pendingPrize[0].toString()) > 0;
  }, [pendingPrize]);
  return (
    <div
      className={`bg-gradient-to-br ${
        winStatus?.[0]
          ? "from-green-500 to-green-600"
          : "from-red-300 to-red-400"
      } rounded-2xl p-3 shadow-xl text-white`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/30 p-2 rounded-full">
          {winStatus?.[0] ? (
            <PartyPopper className="w-5 h-5" />
          ) : (
            <Frown className="w-5 h-5" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-md">
            {winStatus?.[0] ? "You Won!" : "Not This Time!"}
          </h3>
          <p className="text-green-100 text-sm">Round #{winStatus?.[2]}</p>
        </div>
        {/* <p>{pendingPrize && parseFloat(formatEther(pendingPrize[0]))}</p> */}
      </div>

      {winStatus?.[0] && (
        <button
          disabled={isPending || isLoading || !isNotClaimed}
          onClick={handleClaimPrize}
          className="mt-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
        >
          {pendingPrize && isNotClaimed
            ? isPending
              ? "Claiming..."
              : `Claim ${formatUnits(winStatus?.[1], 18) ?? BigInt(0)} BXP`
            : "Claimed"}
        </button>
      )}
    </div>
  );
};

export default WinnerStatus;
