import React from "react";
import ContractBalance from "./ContractBalance";
import PauseSpin from "./PauseSpin";
import { contractAbi } from "@/abi/abi";
import NotifyUsers from "./NotifyUsers";

const Admin = () => {
  return (
    <div className="w-full px-4 space-y-4">
      <ContractBalance />
      <PauseSpin />

      <NotifyUsers />

      <div className="bg-white text-black shadow-lg rounded-2xl text-sm backdrop-blur-md  w-full p-4 space-y-2">
        <p className="text-wrap overflow-hidden">
          Spin contract address:{" "}
          <a
            target="_blank"
            href={`https://basescan.org/address/${contractAbi.claimPrize.address}`}
            className="text-indigo-500 text-xs"
          >
            {contractAbi.claimPrize.address}
          </a>
        </p>
        <p className="text-wrap overflow-hidden">
          Lottery contract address:{" "}
          <a
            target="_blank"
            href={`https://basescan.org/address/${contractAbi.DailyLottery.address}`}
            className="text-indigo-500  text-xs"
          >
            {contractAbi.DailyLottery.address}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Admin;
