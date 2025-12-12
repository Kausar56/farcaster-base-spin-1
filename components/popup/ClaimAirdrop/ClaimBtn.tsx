import React, { ReactNode, useEffect } from "react";
import { Chain } from "viem";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

type ClaimBtnProps = {
  chain: Chain;
  children: ReactNode;
  onClick: () => void;
  className: string;
  disabled?: boolean;
};

const ClaimBtn = ({
  chain,
  children,
  onClick,
  className,
  disabled,
}: ClaimBtnProps) => {
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending: chainSwitching, error } = useSwitchChain();
  const { connect, isPending: walletConnecting } = useConnect();

  useEffect(() => {
    console.log("chain switch  error", error);
  }, [error]);

  if (isConnected) {
    return chainId === chain.id ? (
      <button onClick={onClick} className={className} disabled={disabled}>
        {children}
      </button>
    ) : (
      <button
        disabled={chainSwitching}
        onClick={() => switchChain({ chainId: chain.id })}
        className={`px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg  transition-shadow`}
      >
        {chainSwitching ? "Switching..." : `Switch to ${chain.name}`}
      </button>
    );
  }

  return (
    <button
      disabled={walletConnecting}
      onClick={() => connect({ connector: miniAppConnector() })}
      className={`px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow`}
    >
      {walletConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default ClaimBtn;
