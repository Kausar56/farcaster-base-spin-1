import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFrame } from "./farcaster-provider";
type AuthArgs = {
  fid: number;
  address?: `0x${string}`;
  username: string;
  pfp: string;
  inviter?: number;
};

const useAuth = () => {
  const { setRoute, quickAuth, setAuthData } = useFrame();
  const {
    mutateAsync: registerAsync,
    data: registerData,
    isPending: registerPending,
    isSuccess: registerSuccess,
  } = useMutation({
    mutationFn: async ({ fid, address, username, pfp, inviter }: AuthArgs) => {
      if (!quickAuth) {
        throw new Error("QuickAuth is not available");
      }
      const { token } = await quickAuth.getToken();

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fid,
          address,
          username,
          pfp,
          inviter,
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
      if (setRoute && setAuthData && data?.success) {
        setRoute("lottery");
        setAuthData(data?.user);
      }
    },
  });

  const authCheck = (fid?: number) => {
    return useQuery({
      queryKey: ["auth", fid],
      queryFn: async () => {
        const url = `/api/auth/${fid}`;
        if (!quickAuth) {
          throw new Error("QuickAuth is not available");
        }
        const { token } = await quickAuth.getToken();

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      if (!quickAuth) {
        throw new Error("QuickAuth is not available");
      }
      const { token } = await quickAuth.getToken();
      const res = await fetch("/api/auth/signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  return {
    register: registerAsync,
    authCheck,
    registerPending,
    registerSuccess,
    registerData,
    signMessage,
    isSigning,
    signMessageData,
  };
};

export default useAuth;
