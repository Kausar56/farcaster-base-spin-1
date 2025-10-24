import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFrame } from "./farcaster-provider";
type AuthArgs = {
  fid: number;
  address?: `0x${string}`;
  username: string;
};

const useAuth = () => {
  const { setRoute } = useFrame();
  const {
    mutateAsync: registerAsync,
    data: registerData,
    isPending: registerPending,
    isSuccess: registerSuccess,
  } = useMutation({
    mutationFn: async ({ fid, address, username }: AuthArgs) => {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fid,
          address,
          username,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      // parse and return JSON so onSuccess receives the parsed object (with `success`)
      return (await res.json()) as { success?: boolean; [key: string]: any };
    },
    onSuccess: (data) => {
      if (setRoute && data?.success) setRoute("spin");
    },
  });

  const authCheck = (fid?: number) => {
    return useQuery({
      queryKey: ["auth", fid],
      queryFn: async () => {
        const url = `/api/auth/${fid}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch auth");
        }
        return res.json();
      },
      enabled: !!fid,
    });
  };

  const {
    mutate: signMessage,
    isPending: isSigning,
    data: signMessageData,
  } = useMutation({
    mutationFn: async ({
      userAddress,
      amount,
    }: {
      userAddress: `0x${string}`;
      amount: string;
    }) => {
      const res = await fetch("/api/auth/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress,
          amount,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      return (await res.json()) as {
        signature: string;
        nonce: bigint;
        isSuccess: boolean;
      };
    },
  });

  const { data: configData, isLoading: isConfigLoading } = useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const res = await fetch("/api/config");

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      return (await res.json()) as {
        isSuccess: boolean;
        config: {
          maintenanceMode: boolean;
          isSpinPaused: boolean;
          isQuizPaused: boolean;
        };
      };
    },
  });

  const { mutate: updateConfig, isPending: isUpdatingConfig } = useMutation({
    mutationFn: async (configUpdates: {
      maintenanceMode?: boolean;
      isSpinPaused?: boolean;
      isQuizPaused?: boolean;
    }) => {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONFIG_API_KEY}`,
        },
        body: JSON.stringify(configUpdates),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      return (await res.json()) as {
        isSuccess: boolean;
        config: {
          maintenanceMode: boolean;
          isSpinPaused: boolean;
          isQuizPaused: boolean;
        };
      };
    },
  });

  return {
    register: registerAsync,
    authCheck,
    registerPending,
    registerSuccess,
    registerData,
    signMessage,
    isSigning,
    signMessageData,
    configData,
    isConfigLoading,
    updateConfig,
    isUpdatingConfig,
  };
};

export default useAuth;
