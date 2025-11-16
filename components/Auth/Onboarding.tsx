import React, { useState } from "react";
import {
  ChevronRight,
  Coins,
  TrendingUp,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import useAuth from "../useAuth";
import { useAccount } from "wagmi";
import { useFrame } from "../farcaster-provider";
import toast from "react-hot-toast";

export default function OnboardingApp({ refetch }: { refetch: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
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
      toast.error("Try again!");
    }
  };

  const handleVibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(500); // Vibrate for 500 milliseconds
    } else {
      console.log("Vibration API not supported in this browser.");
    }
  };

  const steps = [
    {
      icon: <Sparkles className="w-16 h-16 text-blue-500" />,
      title: "Welcome to Base Spin",
      description:
        "Earn BXP rewards by playing Lotto & Spin. Swap you BXP to USDC instant!",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute inset-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-30 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="absolute inset-8 bg-primary rounded-full flex items-center justify-center">
            <Coins className="w-20 h-20 text-white" />
          </div>
        </div>
      ),
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-green-500" />,
      title: "How to Earn?",
      description:
        "Play daily spin, Join lottery, daily streak. The more active you are, the more BXP you earn!",
      illustration: (
        <div className="space-y-2 w-full max-w-xs mx-auto">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between text-white">
              <span className="font-semibold">Join Lottery</span>
              <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                UP TO +5k BXP
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-2 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between text-white">
              <span className="font-semibold">Daily Spin</span>
              <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                UP TO +500 BXP
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-2xl shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between text-white">
              <span className="font-semibold">Daily Streak</span>
              <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                +50 BXP
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <RefreshCw className="w-16 h-16 text-blue-500" />,
      title: "Swap Your BXP",
      description:
        "Convert your earned BXP to USDC. Withdraw to your wallet anytime!",
      illustration: (
        <div className="flex justify-center items-center gap-6 w-64 h-48 mx-auto">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-full shadow-xl flex items-center justify-center transform hover:rotate-6 transition">
            <span className="text-white font-bold text-lg">BXP</span>
          </div>
          <div className="">
            <RefreshCw
              className="w-12 h-12 text-gray-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <div className=" bg-gradient-to-br from-blue-400 to-purple-500 w-20 h-20 rounded-full shadow-xl flex items-center justify-center transform hover:rotate-6 transition">
            <span className="text-white font-bold text-sm">USDC</span>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length - 1);
  };

  const handleGetStarted = () => {
    handleRegister();
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="w-full h-full max-w-md bg-blue-100 overflow-hidden">
        {/* Header with Skip Button */}
        <div className="flex justify-between items-center p-6 pb-0">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                onClick={() => handleStepChange(index)}
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-6 bg-blue-300"
                    : "w-6 bg-blue-200"
                }`}
              />
            ))}
          </div>
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-600 font-medium text-sm transition"
            >
              Skip
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          <div className="mb-8 flex justify-center">
            {steps[currentStep].icon}
          </div>

          <div className="mb-8">{steps[currentStep].illustration}</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {steps[currentStep].title}
          </h2>

          <p className="text-gray-600 text-center leading-relaxed mb-8">
            {steps[currentStep].description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleGetStarted}
                disabled={registerPending}
                className="w-full bg-primary text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>
                  {registerPending ? "Please wait..." : "Start Earning Now"}
                </span>
                <Sparkles className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-primary text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Step Counter */}
          <div className="text-center mt-6 text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
}
