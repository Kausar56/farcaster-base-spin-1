import { contractAbi } from "@/abi/abi";
import React from "react";
import { useBalance } from "wagmi";

const ContractBalance = () => {
  const { data: spinGameBalance } = useBalance({
    address: contractAbi.claimPrize.address,
  });
  const { data: quizGameBalance } = useBalance({
    address: contractAbi.DailyLottery.address,
  });
  return (
    <div className="w-full flex flex-col items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
      <div>
        <h1 className="text-blue-600 text-md font-bold">Contract Balances</h1>
      </div>
      <div className="bg-gradient-to-tr from-blue-600 to-blue-500  text-sm text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full grid grid-cols-2 gap-2 p-3">
        <div className="rounded-md overflow-hidden flex flex-col justify-center items-center">
          <span>Spin Game: </span>
          <span className=" text-white font-semibold">
            {spinGameBalance?.formatted.slice(0, 7)} ETH
          </span>
        </div>
        <div className="rounded-md overflow-hidden flex flex-col justify-center items-center">
          <span>Lottery reserve: </span>
          <span className=" text-white font-semibold">
            {quizGameBalance?.formatted.slice(0, 7)} ETH
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractBalance;
