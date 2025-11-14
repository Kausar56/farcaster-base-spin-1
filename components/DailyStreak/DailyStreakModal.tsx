import React from "react";
import Modal from "../common/Modal";
import { Coins, Gift, PartyPopper, X } from "lucide-react";
import { contractAbi } from "@/abi/abi";
import { useWriteContract } from "wagmi";
import useUpdateEarnedPrize from "../useUpdateEarnedPrize";

type DailyStreakModalProps = {
  setShow: (result: boolean) => void;
  signMessageData?: { signature: string; nonce: bigint; isSuccess: boolean };
};

const DailyStreakModal = ({
  setShow,
  signMessageData,
}: DailyStreakModalProps) => {
  const { writeContract, isPending } = useWriteContract();
  const { updateEarnedPrize } = useUpdateEarnedPrize();

  const handleClaim = () => {
    const signature = signMessageData?.signature;
    const nonce = signMessageData?.nonce;

    if (!signature || !nonce) {
      return;
    }
    try {
      writeContract(
        {
          address: contractAbi.claimPrize.address,
          abi: contractAbi.claimPrize.abi,
          functionName: "dailyClaim",
          args: [nonce, signature as `0x${string}`],
        },
        {
          onSuccess: (data) => {
            if (data) {
              setShow(false);
            }
            updateEarnedPrize("100");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal>
      <div className="bg-gradient-to-tr from-blue-600 to-blue-500 relative rounded-2xl p-4 text-center max-w-md w-full">
        <span
          onClick={() => setShow(false)}
          className="absolute right-3 top-3 text-red-500 p-1"
        >
          <X size={24} />
        </span>
        <PartyPopper className="mx-auto mb-4 text-yellow-500" size={48} />
        <h2 className="text-3xl font-bold mb-4 text-white">Daily Streak!</h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Coins className="text-yellow-500" size={24} />
          <span className="text-2xl font-bold text-green-300">+100 BXP</span>
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
    </Modal>
  );
};

export default DailyStreakModal;
