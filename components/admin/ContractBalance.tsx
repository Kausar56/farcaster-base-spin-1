import { contractAbi } from "@/abi/abi";
import React from "react";
import { useBalance } from "wagmi";

const ContractBalance = () => {
  const { data: spinGameBalance } = useBalance({
    address: contractAbi.claimPrize.address,
  });
  const { data: quizGameBalance } = useBalance({
    address: contractAbi.quizGame.address,
  });
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div>
        <h1 className="text-white text-xl font-bold text-center">
          Contract Balances
        </h1>
      </div>
      <div className="bg-indigo-200/20 text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full grid grid-cols-2 gap-2 p-3">
        <div className="rounded-md overflow-hidden text-sm">
          Spin Game:{" "}
          <span className="text-md text-blue-700 font-semibold">
            {spinGameBalance?.formatted} ETH
          </span>
        </div>
        <div className=" rounded-md overflow-hidden text-sm ">
          Quiz Game:{" "}
          <span className="text-md text-blue-700 font-semibold">
            {quizGameBalance?.formatted} ETH
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractBalance;
