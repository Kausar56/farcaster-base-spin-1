import React from "react";
import { useFrame } from "../farcaster-provider";
import { baseSepolia as base } from "viem/chains";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import Button from "./Button";
import { Power } from "lucide-react";

const ConnectedAddress = () => {
  const { isEthProviderAvailable } = useFrame();
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();

  if (isConnected) {
    return chainId === base.id ? (
      <Button>
        {`${address?.slice(0, 4)}...${address?.slice(
          address.length - 3,
          address.length
        )}`}{" "}
        <Power
          className="cursor-pointer text-red-500"
          size={20}
          onClick={() => disconnect()}
        />
      </Button>
    ) : (
      <Button onClick={() => switchChain({ chainId: base.id })}>
        Switch chain
      </Button>
    );
  }

  if (isEthProviderAvailable) {
    return (
      <Button onClick={() => connect({ connector: miniAppConnector() })}>
        Connect
      </Button>
    );
  }

  return <Button>Only For Warpcast</Button>;
};

export default ConnectedAddress;
