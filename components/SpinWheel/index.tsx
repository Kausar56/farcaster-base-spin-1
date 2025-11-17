"use client";

import React, { useState, useEffect } from "react";
import SpinDashboard from "./SpinPannel";
import SpinResult from "./SpinResult";
import WheelSpin from "./Wheel";
import useAuth from "../useAuth";
import AppHeader from "../common/AppHeader";

const SpinWheelGame = () => {
  const [winDetails, setWinDetails] = useState<string | null>(null);
  const [dailySpins, setDailySpins] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const { signMessage, isSigning, signMessageData } = useAuth();

  // Load saved data on component mount
  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("animalSpinData") || "{}"
    );
    const today = new Date().toDateString();

    if (savedData.date === today) {
      setDailySpins(savedData.dailySpins || 0);
      setCanSpin((savedData.dailySpins || 0) < 5);
    } else {
      setDailySpins(0);
      setCanSpin(true);
    }

    setTotalSpins(savedData.totalSpins || 0);
    // localStorage.removeItem("animalSpinData");
  }, []);

  const saveData = (newDailySpins: number, newTotalSpins: number) => {
    const today = new Date().toDateString();
    setDailySpins(newDailySpins);
    setTotalSpins(newTotalSpins);
    setCanSpin(newDailySpins < 5);
    const dataToSave = {
      date: today,
      dailySpins: newDailySpins,
      totalSpins: newTotalSpins,
    };
    localStorage.setItem("animalSpinData", JSON.stringify(dataToSave));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <AppHeader headerName="Daily Spin" />
      {/* Stats Dashboard */}
      <SpinDashboard dailySpins={dailySpins} totalSpins={totalSpins} />

      {/* Spin Wheel */}
      <WheelSpin
        setShowResult={setShowResult}
        setDailySpins={setDailySpins}
        setTotalSpins={setTotalSpins}
        setWinDetails={setWinDetails}
        canSpin={canSpin}
        saveData={saveData}
        dailySpins={dailySpins}
        totalSpins={totalSpins}
        signMessage={signMessage}
      />

      {/* Result Display */}
      {showResult && winDetails && (
        <SpinResult
          signMessageData={signMessageData}
          selectedPrize={winDetails}
          setShowResult={setShowResult}
          isSigning={isSigning}
          spinCount={dailySpins}
        />
      )}
    </div>
  );
};

export default SpinWheelGame;
