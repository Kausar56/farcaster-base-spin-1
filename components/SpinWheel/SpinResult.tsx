import { contractAbi } from "@/abi/abi";
import { Coins, Frown, Gift, Trophy, X } from "lucide-react";
import React from "react";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { useFrame } from "../farcaster-provider";
import useUpdateEarnedPrize from "../useUpdateEarnedPrize";
import toast from "react-hot-toast";
import useAuth from "../useAuth";
import { sign } from "crypto";
import Modal from "../common/Modal";

type SpinResultProps = {
  selectedPrize: string;
  setShowResult: (result: boolean) => void;
  spinCount: number;
};

const SpinResult = ({
  selectedPrize,
  setShowResult,
  spinCount,
}: SpinResultProps) => {
  const { actions } = useFrame();
  const { address } = useAccount();
  const { signMessage, isSigning } = useAuth();

  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();

  const { updateEarnedPrize } = useUpdateEarnedPrize();

  const claimPrize = async () => {
    if (!selectedPrize || isPending || isSigning) {
      return;
    }
    try {
      const spinRewardToast = toast.loading("Initializing...");
      const data = await signMessage({
        userAddress: address!,
        amount: selectedPrize.split(" ")[0],
      });

      const signature = data?.signature;
      const nonce = data?.nonce;

      if (!signature || !nonce) {
        return;
      }
      const amount = selectedPrize.split(" ")[0];
      toast.loading("Claiming...", { id: spinRewardToast });
      await writeContractAsync(
        {
          abi: contractAbi.claimPrize.abi,
          address: contractAbi.claimPrize.address,
          functionName: "claimSpinWinPrize",
          args: [parseEther(amount), nonce, signature as `0x${string}`],
        },
        {
          onSuccess() {
            toast.success("Claim success", { id: spinRewardToast });
            updateEarnedPrize(amount);
            setShowResult(false);

            if (spinCount === 1) {
              handleGenerateCustomOGImage();
            }
          },
          onError: () => {
            toast.error("Claim failed", { id: spinRewardToast });
          },
        }
      );
    } catch (error) {
      console.error("Error claiming prize:", error);
    }
  };
  const handleGenerateCustomOGImage = () => {
    actions?.composeCast({
      text: `🎉 I just claimed ${selectedPrize} playing the Base Spin Game! 🚀

    Think you can beat my score? Try it now 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });
  };

  return (
    <Modal>
      <div className="g-primary relative rounded-2xl p-4 text-center max-w-md w-full">
        {selectedPrize === "Nothing!" ? (
          <Frown className="mx-auto mb-4 text-yellow-500" size={48} />
        ) : (
          <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
        )}
        <h2 className="text-3xl font-bold mb-4 text-white">
          {selectedPrize === "Nothing!" ? "Bad Luck!" : "Congratulations!"}
        </h2>
        {selectedPrize !== "Nothing!" && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Coins className="text-yellow-500" size={24} />
            <span className="text-2xl font-bold text-green-400">
              +{selectedPrize}
            </span>
          </div>
        )}

        {selectedPrize === "Nothing!" ? (
          <span className="text-yellow-500 text-lg font-medium">
            Try again!
          </span>
        ) : (
          !isSuccess && (
            <button
              onClick={claimPrize}
              disabled={isPending || isSigning}
              className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow"
            >
              <Gift />
              {isSigning
                ? "Initializing..."
                : !isError && isPending
                ? "Claiming..."
                : "Claim Prize"}
            </button>
          )
        )}

        <button
          className="mt-4 px-6 py-2 bg-blue-200/20 hover:bg-blue-200/50 rounded-full font-semibold hover:shadow-lg transition-shadow"
          onClick={() => setShowResult(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SpinResult;
