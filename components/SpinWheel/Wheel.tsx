"use client";

import React, { useRef, useState } from "react";
// import { Wheel } from "react-custom-roulette";
import SpinButton from "./SpinButton";
import dynamic from "next/dynamic";
import { UseMutateFunction } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { spinOptions } from "@/lib/constants";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => ({ default: mod.Wheel })),
  { ssr: false }
);

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
      const newPrizeNumber = Math.floor(Math.random() * spinOptions.length);
      setPrizeNumber(newPrizeNumber);
      setWinDetails(spinOptions[newPrizeNumber].option);
      setMustSpin(true);

      if (spinOptions[newPrizeNumber].option != "Nothing!") {
        const prize = spinOptions[newPrizeNumber].option.split(" ")[0];
        signMessage({
          userAddress: address,
          amount: prize,
        });
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
    <div className="w-full mt-4 flex flex-col items-center justify-center mb-4">
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
          outerBorderColor="#2563eb"
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={spinOptions}
          onStopSpinning={handleStopSpin}
          pointerProps={{ style: {} }}
          innerBorderColor="blue"
          outerBorderWidth={8}
          radiusLineColor="#2563eb"
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
