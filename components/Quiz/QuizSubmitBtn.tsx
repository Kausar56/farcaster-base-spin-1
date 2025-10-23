import React from "react";
import { useFrame } from "../farcaster-provider";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { useAccount, useConnect, useReadContract, useSwitchChain } from "wagmi";
import { base } from "viem/chains";
import { contractAbi } from "@/abi/abi";

type ButtonProps = {
  handleSubmitAns?: () => void;
  state?: "connected" | "switch" | "disconnected";
  selectedAns?: number | null;
  isPending?: boolean;
};

const Button = ({
  handleSubmitAns,
  state,
  selectedAns,
  isPending,
}: ButtonProps) => {
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();
  const { address } = useAccount();

  const {
    data: hasPlayed,
    isLoading,
    isFetching,
  } = useReadContract({
    abi: contractAbi.quizGame.abi,
    address: contractAbi.quizGame.address,
    functionName: "hasPlayedToday",
    args: [address!],
  });

  if (state === "connected") {
    return (
      <button
        onClick={handleSubmitAns}
        disabled={isLoading || isFetching || hasPlayed}
        className={`mt-4 px-8 py-2 rounded-full text-xl font-bold transition-all duration-300 transform ${
          !hasPlayed
            ? "bg-gradient-to-r from-violet-400 to-indigo-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        <div className="flex items-center gap-3">
          {hasPlayed
            ? "Come Back Tomorrow"
            : isPending
            ? "Submitting..."
            : selectedAns !== null
            ? "Submit"
            : "Select An Option"}
        </div>
      </button>
    );
  } else if (state === "switch") {
    return (
      <button
        onClick={() => switchChain({ chainId: base.id })}
        className="mt-4 px-8 py-2 rounded-full text-xl font-bold transition-all duration-300 transform bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
      >
        Switch To Base
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: miniAppConnector() })}
      className="mt-4 px-8 py-2 rounded-full text-xl font-bold transition-all duration-300 transform bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
    >
      Connect To Submit
    </button>
  );
};

const QuizSubmitBtn = ({
  handleSubmitAns,
  selectedAns,
  isPending,
}: ButtonProps) => {
  const { isEthProviderAvailable } = useFrame();
  const { isConnected, chainId } = useAccount();

  if (isConnected) {
    return chainId === base.id ? (
      <Button
        handleSubmitAns={handleSubmitAns}
        state="connected"
        selectedAns={selectedAns}
        isPending={isPending}
      />
    ) : (
      <Button state="switch" />
    );
  }

  if (isEthProviderAvailable) {
    return <Button state="disconnected" />;
  }
};

export default QuizSubmitBtn;
