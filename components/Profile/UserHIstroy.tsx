import { contractAbi } from "@/abi/abi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

const UserHIstroy = () => {
  const { address } = useAccount();
  const [totalSpins, setTotalSpins] = useState(0);

  const { data: userHistory, isLoading: isLoadingUserHistory } =
    useReadContract({
      abi: contractAbi.DailyLottery.abi,
      address: contractAbi.DailyLottery.address,
      functionName: "getUserHistory",
      args: [address!, BigInt(1), BigInt(3)],
    });

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("animalSpinData") || "{}"
    );

    setTotalSpins(savedData.totalSpins || 0);
  }, []);

  const rounds =
    userHistory &&
    userHistory[0].reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator.toString()) + parseInt(currentValue.toString()),
      0
    );

  const totalWins = userHistory && userHistory[1].filter(Boolean).length;
  const totalPrize =
    userHistory &&
    userHistory[2].reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator.toString()) + parseInt(currentValue.toString()),
      0
    );
  return (
    <div className="bg-white rounded-2xl p-3 shadow-lg w-full grid grid-cols-2 gap-2 ">
      <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-xl overflow-hidden p-2 text-sm flex justify-between">
        Total spins:{" "}
        <span className="text-md text-white font-semibold">{totalSpins}</span>
      </div>
      <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-xl overflow-hidden p-2 text-sm flex justify-between items-center">
        Total Entry:{" "}
        <span className="text-md  font-semibold">
          {isLoadingUserHistory ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            totalWins?.toString()
          )}
        </span>
      </div>
      <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-xl overflow-hidden p-2 text-sm flex justify-between">
        Earned:{" "}
        <span className="text-md  font-semibold">
          {isLoadingUserHistory ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            totalPrize && formatEther(BigInt(totalPrize)).slice(0, 6)
          )}
        </span>
      </div>
      <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-xl overflow-hidden p-2 text-sm flex justify-between">
        Total win:{" "}
        <span className="text-md  font-semibold">
          {isLoadingUserHistory ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            rounds?.toString()
          )}
        </span>
      </div>
    </div>
  );
};

export default UserHIstroy;
