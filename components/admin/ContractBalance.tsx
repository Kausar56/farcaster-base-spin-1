import { contractAbi } from "@/abi/abi";
import React from "react";
import { formatUnits } from "viem";
import { useBalance } from "wagmi";

const ContractBalance = () => {
  return (
    <div className="w-full flex flex-col items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
      <div>
        <h1 className="text-blue-600 text-md font-bold">Contract Balances</h1>
      </div>
      <div className="  text-sm text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full grid grid-cols-2 gap-2">
        {Object.keys(contractAbi).map((key) => {
          if (key === "ERC20_ABI") return;
          return <Contract key={key} contract={key} />;
        })}
      </div>
    </div>
  );
};

const Contract = ({ contract }: { contract: string }) => {
  type ContractKey = keyof typeof contractAbi;
  const currentKey: ContractKey = contract as ContractKey;
  const { data: spinGameBalance } = useBalance({
    address: contractAbi[currentKey].address as `0x${string}`,
  });
  const { data: spinGameBXPBalance } = useBalance({
    address: contractAbi[currentKey].address as `0x${string}`,
    token: contractAbi.BXPToken.address,
  });
  const { data: spinGameUSDTBalance } = useBalance({
    address: contractAbi[currentKey].address as `0x${string}`,
    token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  });
  return (
    <div className="bg-primary p-2 rounded-md overflow-hidden flex flex-col justify-center items-center">
      <span>{contract}: </span>
      <span className=" text-white font-semibold">
        {spinGameBalance?.formatted.slice(0, 7)} ETH
      </span>
      <span className=" text-white font-semibold">
        {(contract === "claimPrize" ||
          contract === "DailyLottery" ||
          contract === "FlexibleBXPSwap" ||
          contract === "PixelCatHolderAirdrop") &&
          spinGameBXPBalance &&
          parseInt(formatUnits(spinGameBXPBalance?.value, 18)) + " BXP"}{" "}
      </span>
      <span className=" text-white font-semibold">
        {contract === "FlexibleBXPSwap" &&
          spinGameUSDTBalance &&
          parseFloat(formatUnits(spinGameUSDTBalance?.value, 6)).toFixed(2) +
            " USDC"}{" "}
      </span>
    </div>
  );
};

export default ContractBalance;
