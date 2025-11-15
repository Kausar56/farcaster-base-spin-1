import { contractAbi } from "@/abi/abi";
import React, { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

const ChangeLotteryPrizePool = () => {
  const { writeContractAsync: setPrizePool, isPending } = useWriteContract();
  const [amount, setAmount] = useState("");

  const handleChangePrizePool = async (amount: string) => {
    if (!amount || Number(amount) < 100) return;
    try {
      await setPrizePool(
        {
          address: contractAbi.DailyLottery.address,
          abi: contractAbi.DailyLottery.abi,
          args: [parseEther(amount)],
          functionName: "setPrizePoolAmount",
        },
        {
          onSuccess: () => {
            setAmount("");
          },
        }
      );
    } catch (error) {
      console.log(error);
      setAmount("");
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
      <div>
        <h1 className="text-blue-600 text-md font-bold">
          Change Lottery Prize Pool
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 items-center gap-2">
        <input
          value={amount}
          disabled={isPending}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Enter amount"
          className="p-2 border-2 text-blue-600 rounded-2xl border-blue-500 outline-none w-full bg-blue-100"
        />
        <button
          onClick={() => handleChangePrizePool(amount)}
          className="py-2 px-3 bg-blue-600 rounded-2xl text-white"
        >
          {isPending ? "Changing..." : "Change"}
        </button>
      </div>
    </div>
  );
};

export default ChangeLotteryPrizePool;
