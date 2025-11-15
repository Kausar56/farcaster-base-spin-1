import React, { useEffect } from "react";
// import LotteryHeader from "./LotteryHeader";
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
import AppHeader from "../common/AppHeader";
import useCheckLastRoundResult from "./hooks/useCheckLastRoundResult";
import RoundCancelled from "./RoundCancelled";
import LoadingSkeleton from "./LoadingSkeleton";
import { AlertCircle } from "lucide-react";

export default function Lottery() {
  const { inCooldown, isLoadingLotteryStatus, refetchLotteryData } =
    useGetLotteryStatus();
  const { meetsMinimum, isLoadingDrawStatus, refetchDrawStatus } =
    useGetDrawStatus();
  const { wasCancelled, isLoadingLastRoundResult } = useCheckLastRoundResult();

  useEffect(() => {
    const interval = setInterval(async () => {
      refetchLotteryData();
      refetchDrawStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchLotteryData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pb-6">
      {/* Header */}
      <AppHeader headerName="Daily Lottery" />

      {isLoadingLotteryStatus ||
      isLoadingDrawStatus ||
      isLoadingLastRoundResult ? (
        <LoadingSkeleton />
      ) : (
        <div className="px-4 -mt-4 space-y-3">
          {/* Draw Countdown Timer */}
          {!inCooldown && <DrawCountDown />}

          {!inCooldown && (
            <div className="bg-primary rounded-2xl px-6 py-2 shadow-lg">
              <p className="flex gap-2 items-center text-white text-xs font-semibold">
                <span>
                  <AlertCircle className="h-4 w-4" />
                </span>
                <span>
                  If you <span className="text-orange-300 font-bold">win</span>{" "}
                  previous round, rewards will be available on profile tab!
                </span>
              </p>
            </div>
          )}

          {/* Cooldown Banner */}
          {inCooldown && <CooldownBanner />}

          {/* Minimum Met Warning */}
          {!inCooldown && !meetsMinimum && <MinimumMetWarning />}

          {/* Was cancelled */}
          {inCooldown && wasCancelled && <RoundCancelled />}

          {/** Winner Status */}
          {inCooldown && !wasCancelled && <WinnerStatus />}

          {/* Stats Grid */}
          {!inCooldown && meetsMinimum && <StatsGrid />}

          {/* Prize Info */}
          {!inCooldown && meetsMinimum && <PrizeInfo />}

          {/* Entry Button */}
          {!inCooldown && <EntryButton />}

          {/* Info card */}
          {inCooldown && <InfoCards />}
        </div>
      )}
    </div>
  );
}
