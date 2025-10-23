"use client";

import React, { useEffect, useRef, useState } from "react";
// import { Wheel } from "react-custom-roulette";
import SpinButton from "./SpinButton";
import dynamic from "next/dynamic";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => ({ default: mod.Wheel })),
  { ssr: false }
);

const data = [
  {
    option: "0.00003 ETH",
    style: { backgroundColor: "#0E3386", textColor: "#F8FAFC" },
  },
  {
    option: "0.00004 ETH",
    style: { backgroundColor: "#0E3386", textColor: "#FFFFFF" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#0E3386", textColor: "#F9FAFB" },
  },
  {
    option: "0.00001 ETH",
    style: { backgroundColor: "#0E3386", textColor: "#FFFBEB" },
  },
  {
    option: "0.00002 ETH",
    style: { backgroundColor: "#0E3386", textColor: "#F0F9FF" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#0E3386", textColor: "#f5b939" },
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
};

const WheelSpin = ({
  setShowResult,
  setWinDetails,
  dailySpins,
  totalSpins,
  canSpin,
  saveData,
}: WheelSpinProps) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpinClick = () => {
    if (!mustSpin && canSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setWinDetails(data[newPrizeNumber].option);
      setMustSpin(true);

      if (audioRef.current && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStopSpin = () => {
    setMustSpin(false);
    setShowResult(true);

    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
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
