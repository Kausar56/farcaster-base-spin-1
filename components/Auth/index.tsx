import React, { useEffect } from "react";
import { useFrame } from "../farcaster-provider";
import useAuth from "../useAuth";
import { useAccount } from "wagmi";
import Image from "next/image";
// import { SignInButton } from "@farcaster/auth-kit";

const Auth = ({ refetch }: { refetch: () => void }) => {
  const { register, registerPending } = useAuth();
  const { address } = useAccount();
  const { actions, context } = useFrame();

  const handleRegister = async () => {
    const fid = context?.user?.fid;
    if (!fid || !address) return;

    try {
      await register({ fid, address });
      refetch();
      if (actions) {
        actions?.addMiniApp();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image src="/splash.png" alt="Start Button" width={100} height={100} />

      <button
        className="mt-4 px-8 py-2 rounded-full text-xl font-bold transition-all duration-300 transform bg-gradient-to-r from-violet-400 to-indigo-500 text-white hover:scale-110 hover:shadow-xl active:scale-95"
        disabled={registerPending}
        onClick={handleRegister}
      >
        {registerPending ? "Waiting..." : "Start"}
      </button>
    </div>
  );
};

export default Auth;
