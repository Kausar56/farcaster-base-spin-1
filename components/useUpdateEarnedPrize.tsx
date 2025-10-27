import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useFrame } from "./farcaster-provider";

const useUpdateEarnedPrize = () => {
  const { context } = useFrame();
  const fid = context?.user?.fid;
  const { mutate: updateEarnedPrize } = useMutation({
    mutationFn: async (prize: string) => {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fid, prize }),
      });
      return res.json();
    },
  });
  return { updateEarnedPrize };
};

export default useUpdateEarnedPrize;
