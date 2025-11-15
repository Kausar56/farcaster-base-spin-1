import React from "react";
import ContractBalance from "./ContractBalance";
import PauseSpin from "./PauseSpin";
import { contractAbi } from "@/abi/abi";
import NotifyUsers from "./NotifyUsers";
import AppHeader from "../common/AppHeader";
import ChangeLotteryPrizePool from "./ChangeLotteryPrizePool";

const Admin = () => {
  return (
    <>
      <AppHeader headerName="Admin panel" />
      <div className="w-full px-4 space-y-4 mb-16 -mt-4">
        <ContractBalance />
        <ChangeLotteryPrizePool />
        <PauseSpin />

        <NotifyUsers />

        <div className="bg-white text-black shadow-lg rounded-2xl text-sm backdrop-blur-md  w-full p-4 space-y-2">
          {Object.keys(contractAbi).map((key) => {
            type ContractKey = keyof typeof contractAbi;
            const currentKey: ContractKey = key as ContractKey;
            if (key === "BXPSwap") return;
            return (
              <p className="text-wrap overflow-hidden">
                <a
                  target="_blank"
                  href={`https://basescan.org/address/${contractAbi[currentKey].address}`}
                  className="text-indigo-500 text-xs"
                >
                  {key}:{" "}
                </a>
                {contractAbi[currentKey].address}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Admin;
