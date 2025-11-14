import React from "react";
import AppHeader from "./AppHeader";
import { Wallet } from "lucide-react";
import { useFrame } from "../farcaster-provider";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

const ConnectWalletPage = () => {
  const { isEthProviderAvailable } = useFrame();
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { connect, isPending: connecting } = useConnect();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pb-6">
      {/* Header */}
      <AppHeader headerName="Connect Wallet" />

      {isEthProviderAvailable && (
        <div className="px-4 -mt-4 space-y-4">
          <div className="bg-white rounded-2xl px-6 py-2 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">
                Connect your wallet
              </h3>
            </div>
            {
              <button
                onClick={() => connect({ connector: miniAppConnector() })}
                className="bg-primary text-white rounded-xl p-2 text-center w-full"
              >
                {connecting ? "Connecting..." : "Connect wallet"}
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletPage;
