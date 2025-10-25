import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Trophy,
  Coins,
  Zap,
  Timer,
  Sparkles,
} from "lucide-react";
import LotteryHeader from "./LotteryHeader";
import PrizeInfo from "./PrizeInfo";
import EntryButton from "./EntryButton";
import StatsGrid from "./StatsGrid";
import useGetLotteryStatus from "./hooks/useGetLotteryStatus";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import DrawCountDown from "./DrawCountDown";
import CooldownBanner from "./CooldownBanner";
import MinimumMetWarning from "./MinimumMetWarnning";
import WinnerStatus from "./WinnerStatus";
import InfoCards from "./InfoCards";

export default function Lottery() {
  const { inCooldown, isLoadingLotteryStatus } = useGetLotteryStatus();
  const { meetsMinimum } = useGetDrawStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pb-6">
      {/* Header */}
      <LotteryHeader />

      <div className="px-4 -mt-4 space-y-4">
        {/* Minimum Met Warning */}
        {!inCooldown && !meetsMinimum && <MinimumMetWarning />}

        {/** Winner Status */}
        {inCooldown && <WinnerStatus />}

        {/* Cooldown Banner */}
        {inCooldown && <CooldownBanner />}

        {/* Draw Countdown Timer */}
        {!inCooldown && <DrawCountDown />}

        {/* Stats Grid */}
        {!inCooldown && <StatsGrid />}

        {/* Prize Info */}
        {!inCooldown && meetsMinimum && <PrizeInfo />}

        {/* Entry Button */}
        {!inCooldown && <EntryButton />}

        {/* Info card */}
        {inCooldown && <InfoCards />}
      </div>
    </div>
  );
}
