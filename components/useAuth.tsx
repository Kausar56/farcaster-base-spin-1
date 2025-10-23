import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFrame } from "./farcaster-provider";
type AuthArgs = {
  fid: number;
  address?: `0x${string}`;
};

const useAuth = () => {
  const { setRoute } = useFrame();
  const {
    mutateAsync: registerAsync,
    data: registerData,
    isPending: registerPending,
    isSuccess: registerSuccess,
  } = useMutation({
    mutationFn: async ({ fid, address }: AuthArgs) => {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fid,
          address,
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

  return {
    register: registerAsync,
    authCheck,
    registerPending,
    registerSuccess,
    registerData,
  };
};

export default useAuth;
