import { RotateCw } from "lucide-react";
import React from "react";
import { useFrame } from "../farcaster-provider";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { base } from "viem/chains";

type ButtonProps = {
  handleSpinClick?: () => void;
  canSpin?: boolean;
  mustSpin?: boolean;
  state?: "connected" | "switch" | "disconnected";
};

const Button = ({ handleSpinClick, canSpin, mustSpin, state }: ButtonProps) => {
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();

  if (state === "connected") {
    return (
      <button
        onClick={handleSpinClick}
        disabled={!canSpin || mustSpin}
        className={`mt-4 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform ${
          canSpin
            ? "bg-gradient-to-r from-[#0000FF] to-[#191970] text-white hover:scale-110 hover:shadow-xl active:scale-95"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        <div className="flex items-center gap-3">
          <RotateCw className={mustSpin ? "animate-spin" : ""} size={24} />
          {mustSpin
            ? "Spinning..."
            : canSpin
            ? "SPIN NOW!"
            : "Daily Limit Reached"}
        </div>
      </button>
    );
  } else if (state === "switch") {
    return (
      <button
        onClick={() => switchChain({ chainId: base.id })}
        className="mt-4 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
      >
        Switch To Base
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: miniAppConnector() })}
      className="mt-4 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
    >
      Connect To Spin
    </button>
  );
};

const SpinButton = ({ handleSpinClick, canSpin, mustSpin }: ButtonProps) => {
  const { isEthProviderAvailable } = useFrame();
  const { isConnected, chainId } = useAccount();

  if (isConnected) {
    return chainId === base.id ? (
      <Button
        handleSpinClick={handleSpinClick}
        canSpin={canSpin}
        mustSpin={mustSpin}
        state="connected"
      />
    ) : (
      <Button state="switch" />
    );
  }

  if (isEthProviderAvailable) {
    return <Button state="disconnected" />;
  }
};

export default SpinButton;
