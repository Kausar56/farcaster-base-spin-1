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
import RefundAndClaimBtn from "../Profile/RefundAndClaimBtn";
import { useAccount } from "wagmi";
import { base } from "viem/chains";
import { useFrame } from "../farcaster-provider";

export default function Lottery() {
  const { inCooldown, isLoadingLotteryStatus, refetchLotteryData } =
    useGetLotteryStatus();
  const { meetsMinimum, isLoadingDrawStatus, refetchDrawStatus } =
    useGetDrawStatus();
  const { wasCancelled, isLoadingLastRoundResult } = useCheckLastRoundResult();
  const { chainId } = useAccount();
  const { setRoute } = useFrame();

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
      <AppHeader headerName="Draw" />

      {chainId !== base.id ? (
        <p className="text-blue-500 text-center mt-8 font-bold text-xl">
          Please Switch To Base Mainnet
        </p>
      ) : isLoadingLotteryStatus ||
        isLoadingDrawStatus ||
        isLoadingLastRoundResult ? (
        <LoadingSkeleton />
      ) : (
        <div className="px-4 -mt-4 space-y-3">
          {/* Draw Countdown Timer */}
          {!inCooldown && <DrawCountDown />}

          {!inCooldown && <RefundAndClaimBtn />}

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

      <div
        onClick={() => setRoute("airdrop")}
        className="fixed flex-col   cursor-pointer flex justify-center items-center bg-gradient  right-4 bottom-24"
      >
        <img src="/gift.gif" className="animate-bounce h-16 w-16" />
        <p className="text-xs animate-pulse font-bold bg-orange-500 text-white py-1 px-2 rounded-xl">
          Claim Reward
        </p>
      </div>
    </div>
  );
}
