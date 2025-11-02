import { contractAbi } from "@/abi/abi";
import { Coins, Gift, PartyPopper, X } from "lucide-react";
import React from "react";
import { useWriteContract } from "wagmi";
import { useFrame } from "../farcaster-provider";

const ClaimGiveaway = ({
  setShow,
  signature,
}: {
  setShow: (show: boolean) => void;
  signature: string;
}) => {
  const { writeContract, isPending } = useWriteContract();
  const { context, actions } = useFrame();

  const handleClaim = () => {
    const fid = context?.user?.fid;

    if (!context || !fid || !signature) {
      return;
    }
    try {
      writeContract(
        {
          address: contractAbi.Giveaway.address,
          abi: contractAbi.Giveaway.abi,
          functionName: "claimGiveawayPrize",
          args: [BigInt(fid), signature as `0x${string}`],
        },
        {
          onSuccess: () => {
            handleCast();
            setShow(false);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCast = () => {
    actions?.composeCast({
      text: `🎉 The first 500 users (FCFS) can claim $0.10 USDT each 🚀

    You can also earn by joining this app’s lottery and get 2 free spins daily 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-gradient-to-tr from-blue-600 to-blue-500 relative rounded-2xl p-4 text-center max-w-md w-full">
        <span
          onClick={() => setShow(false)}
          className="absolute right-3 top-3 text-red-500 p-1"
        >
          <X size={24} />
        </span>
        <PartyPopper className="mx-auto mb-4 text-yellow-500" size={48} />
        <h2 className="text-3xl font-bold mb-4 text-white">Giveaway!</h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Coins className="text-yellow-500" size={24} />
          <span className="text-2xl font-bold text-green-300">+0.1$</span>
        </div>

        <button
          onClick={handleClaim}
          disabled={isPending}
          className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow"
        >
          <Gift />
          {isPending ? "Claiming..." : "Claim Now"}
        </button>
      </div>
    </div>
  );
};

export default ClaimGiveaway;
