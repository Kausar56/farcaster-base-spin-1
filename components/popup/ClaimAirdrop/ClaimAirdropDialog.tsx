import { contractAbi } from "@/abi/abi";
import Modal from "@/components/common/Modal";
import { useFrame } from "@/components/farcaster-provider";
import { ArrowBigRight, Coins, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const ClaimAirdropDialog = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setRoute } = useFrame();

  const handleCheckEligibility = () => {
    setRoute("airdrop");
    setShow(false);
    localStorage.setItem("hasSeenAirdropDialog", "true");
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("hasSeenAirdropDialog", "true");
  };
  return (
    <Modal>
      <div className="bg-gradient-to-tr from-blue-600 to-blue-500 relative rounded-2xl p-4 text-center max-w-md w-full">
        <span
          onClick={handleClose}
          className="absolute right-3 top-3 text-red-500 p-1 cursor-pointer duration-75 hover:bg-white/20 rounded-full"
        >
          <X size={24} />
        </span>
        <Coins className="mx-auto mb-4 text-yellow-500" size={48} />
        <h2 className="text-3xl font-bold mb-4 text-white">Weekly Airdrop</h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-md font-bold text-gray-100">
            Pixel Cat holder will get Airdrop every week! 🎉
          </span>
        </div>

        <button
          onClick={handleCheckEligibility}
          className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow"
        >
          Check Eligibility <ArrowBigRight />
        </button>
      </div>
    </Modal>
  );
};

export default ClaimAirdropDialog;
