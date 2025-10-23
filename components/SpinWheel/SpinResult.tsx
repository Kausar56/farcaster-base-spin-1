import { contractAbi } from "@/abi/abi";
import { Coins, Frown, Gift, Trophy, X } from "lucide-react";
import React, { useEffect } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { useFrame } from "../farcaster-provider";
import { useMutation } from "@tanstack/react-query";

type SpinResultProps = {
  selectedPrize: string;
  setShowResult: (result: boolean) => void;
};

const SpinResult = ({ selectedPrize, setShowResult }: SpinResultProps) => {
  const { context, actions } = useFrame();

  const fid = context?.user?.fid;

  const { writeContract, isPending, isSuccess, isPaused, isError } =
    useWriteContract();

  const { mutate: updatePrize } = useMutation({
    mutationFn: async (prize: string) => {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fid, prize }),
      });
      return res.json();
    },
  });

  const claimPrize = () => {
    if (!selectedPrize || isPending || isSuccess) return;
    const amount = selectedPrize.split(" ")[0];

    if (typeof parseFloat(amount) === "string") return;

    writeContract(
      {
        abi: contractAbi.claimPrize.abi,
        address: contractAbi.claimPrize.address,
        functionName: "claimPrize",
        args: [parseEther(amount)],
      },
      {
        onSuccess(data) {
          updatePrize(amount);
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      handleGenerateCustomOGImage();
      setShowResult(false);
    }
  }, [isSuccess]);

  const handleGenerateCustomOGImage = () => {
    actions?.composeCast({
      text: `🎉 I just claimed ${selectedPrize} playing the Base Spin Game! 🚀

    Think you can beat my score? Try it now 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });

    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-violet-600/20 relative backdrop-blur-md rounded-3xl p-8 text-center max-w-md w-full transform">
        <span
          onClick={() => setShowResult(false)}
          className="absolute right-3 top-3 text-red-500 p-1"
        >
          <X size={24} />
        </span>

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
            <span className="text-2xl font-bold text-green-600">
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
              disabled={isPending}
              className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow"
            >
              <Gift />
              {!isError && isPending ? "Claiming..." : "Claim!"}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SpinResult;
