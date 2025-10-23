"use client";

import React, { useRef, useState } from "react";
// import { Wheel } from "react-custom-roulette";
import SpinButton from "./SpinButton";
import dynamic from "next/dynamic";
import { UseMutateFunction } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => ({ default: mod.Wheel })),
  { ssr: false }
);

const data = [
  {
    option: "0.00003 ETH",
    style: { backgroundColor: "#09128f", textColor: "#F8FAFC" },
  },
  {
    option: "0.00004 ETH",
    style: { backgroundColor: "#1717c9", textColor: "#FFFFFF" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#2121d9", textColor: "#f5b939" },
  },
  {
    option: "0.00001 ETH",
    style: { backgroundColor: "#1818fa", textColor: "#FFFBEB" },
  },
  {
    option: "0.00002 ETH",
    style: { backgroundColor: "#224fee", textColor: "#F0F9FF" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#375cee", textColor: "#f5b939" },
  },
];

type WheelSpinProps = {
  setShowResult: (result: boolean) => void;
  setDailySpins: (spins: number) => void;
  setTotalSpins: (spins: number) => void;
  setWinDetails: (win: string) => void;
  canSpin: boolean;
  totalSpins: number;
  dailySpins: number;
  saveData: (totalSpins: number, dailySpin: number) => void;
  signMessage: UseMutateFunction<
    { signature: string; nonce: bigint; isSuccess: boolean },
    Error,
    { userAddress: `0x${string}`; amount: string },
    unknown
  >;
};

const WheelSpin = ({
  setShowResult,
  setWinDetails,
  dailySpins,
  totalSpins,
  canSpin,
  saveData,
  signMessage,
}: WheelSpinProps) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { address } = useAccount();

  const handleSpinClick = () => {
    if (!mustSpin && canSpin && address) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setWinDetails(data[newPrizeNumber].option);
      setMustSpin(true);

      if (data[newPrizeNumber].option != "Nothing!") {
        const prize = data[newPrizeNumber].option.split(" ")[0];
        signMessage({ userAddress: address, amount: prize });
      }

      if (audioRef.current && !isPlaying) {
        // Reset to start so playback always begins from the start
        try {
          audioRef.current.currentTime = 0;
        } catch (e) {
          // ignore if not ready
        }
        // Play returns a promise; await to handle autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // If playback is blocked (autoplay policy), still mark as not playing
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const handleStopSpin = () => {
    setMustSpin(false);
    setShowResult(true);

    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      try {
        audioRef.current.currentTime = 0;
      } catch (e) {
        // ignore
      }
      setIsPlaying(false);
    }

    // Update statistics
    const newDailySpins = dailySpins + 1;
    const newTotalSpins = totalSpins + 1;

    saveData(newDailySpins, newTotalSpins);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-4">
      <audio
        className="hidden"
        ref={audioRef}
        src="/wheel-sound.mp3"
        preload="auto"
        playsInline
        // onTimeUpdate={handleTimeUpdate}
        // onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="relative">
        <Wheel
          outerBorderColor="#191970"
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpin}
          pointerProps={{ style: {} }}
          innerBorderColor="blue"
          outerBorderWidth={8}
          radiusLineColor="#3498DB"
        />
      </div>

      <SpinButton
        canSpin={canSpin}
        handleSpinClick={handleSpinClick}
        mustSpin={mustSpin}
      />
    </div>
  );
};

export default WheelSpin;
