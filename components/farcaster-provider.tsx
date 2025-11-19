import type { Context } from "@farcaster/miniapp-sdk";
import sdk from "@farcaster/miniapp-sdk";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useState } from "react";

export type RouteUnion =
  | "spin"
  | "lottery"
  | "leaderboard"
  | "profile"
  | "admin"
  | "airdrop";

interface AuthData {
  fid: string;
  username: string;
  address: string;
  pfp: string;
  earned: number;
  invited: number;
  refer_income: number;
}

interface FrameContextValue {
  context: Context.MiniAppContext | undefined;
  isLoading: boolean;
  isSDKLoaded: boolean;
  isEthProviderAvailable: boolean;
  actions: typeof sdk.actions | undefined;
  haptics: typeof sdk.haptics | undefined;
  route: RouteUnion;
  setRoute: (page: RouteUnion) => void;
  quickAuth: typeof sdk.quickAuth | undefined;
  authData: AuthData | undefined;
  setAuthData: (data: AuthData) => void;
}

const FrameProviderContext = createContext<FrameContextValue | undefined>(
  undefined
);

export function useFrame() {
  const context = useContext(FrameProviderContext);
  if (context === undefined) {
    throw new Error("useFrame must be used within a FrameProvider");
  }
  return context;
}

interface FrameProviderProps {
  children: ReactNode;
}

export function FrameProvider({ children }: FrameProviderProps) {
  const [route, setRoute] = useState<RouteUnion>("lottery");
  const [authData, setAuthData] = useState<AuthData | undefined>(undefined);
  const farcasterContextQuery = useQuery({
    queryKey: ["farcaster-context"],
    queryFn: async () => {
      const context = await sdk.context;
      try {
        await sdk.actions.ready();
        return { context, isReady: true };
      } catch (err) {
        console.error("SDK initialization error:", err);
      }
      return { context, isReady: false };
    },
  });

  const isReady = farcasterContextQuery.data?.isReady ?? false;

  return (
    <FrameProviderContext.Provider
      value={{
        context: farcasterContextQuery.data?.context,
        actions: sdk.actions,
        haptics: sdk.haptics,
        isLoading: farcasterContextQuery.isPending,
        isSDKLoaded: isReady && Boolean(farcasterContextQuery.data?.context),
        isEthProviderAvailable: Boolean(sdk.wallet.ethProvider),
        route,
        quickAuth: sdk.quickAuth,
        setRoute,
        authData,
        setAuthData,
      }}
    >
      {children}
    </FrameProviderContext.Provider>
  );
}
