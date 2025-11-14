import React from "react";
import { useFrame } from "../farcaster-provider";
import useAuth from "../useAuth";
import { useAccount } from "wagmi";
import Image from "next/image";
import toast from "react-hot-toast";

const Auth = ({ refetch }: { refetch: () => void }) => {
  const { register, registerPending } = useAuth();
  const { address } = useAccount();
  const { actions, context } = useFrame();

  const handleRegister = async () => {
    if (!context) return;
    const fid = context?.user?.fid;
    const pfp = context?.user?.pfpUrl || "https://pfp.com";
    const username = context?.user?.username;
    if (!fid || !address || !username || !pfp) return;

    try {
      handleVibrate();
      await register(
        { fid, address, username, pfp },
        {
          onSuccess: () => {
            refetch();
          },
          onError: () => {
            toast.error("Try again!");
          },
        }
      );

      if (actions) {
        actions?.addMiniApp();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(500); // Vibrate for 500 milliseconds
    } else {
      console.log("Vibration API not supported in this browser.");
    }
  };

  return (
    <div className="flex bg-blue-300 min-h-screen flex-col items-center justify-center">
      <Image src="/splash.png" alt="Start Button" width={100} height={100} />
      <div>
        <h1 className="text-3xl text-blue-500 font-bold">Base spin</h1>
        <p className="text-sm text-blue-800 text-center">Fun Lotto and Spin</p>
      </div>

      <button
        className="mt-4 px-8 py-2 rounded-full text-xl font-bold transition-all duration-300 transform bg-primary text-white hover:scale-110 hover:shadow-xl active:scale-95"
        disabled={registerPending}
        onClick={handleRegister}
      >
        {registerPending ? "Opening..." : "Start Playing"}
      </button>
    </div>
  );
};

export default Auth;
