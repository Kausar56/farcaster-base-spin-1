import React, { useEffect, useState } from "react";
import { useFrame } from "../farcaster-provider";
import { tokens } from "@/lib/tokens";
import Token from "./Token";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { contractAbi } from "@/abi/abi";
import { Loader } from "lucide-react";
import { formatUnits } from "viem";

const ProfilePfp = () => {
  const { context } = useFrame();
  const { quizGame } = contractAbi;
  const { address } = useAccount();
  const [totalSpins, setTotalSpins] = useState(0);
  const { data: totalAnswered, isLoading: totalAnswerLoading } =
    useReadContract({
      abi: quizGame.abi,
      address: quizGame.address,
      functionName: "totalAnswered",
      args: [address!],
    });
  const { data: scores, isLoading: scoreLoading } = useReadContract({
    abi: quizGame.abi,
    address: quizGame.address,
    functionName: "scores",
    args: [address!],
  });

  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
  });

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("animalSpinData") || "{}"
    );

    setTotalSpins(savedData.totalSpins || 0);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 px-4 -mt-4">
      <div className="bg-white rounded-2xl p-3 shadow-lg w-full flex items-center gap-4">
        <div className="w-20 h-20 ring-1 rounded-full overflow-hidden bg-indigo-500">
          {context?.user?.pfpUrl && (
            <img
              src={context?.user?.pfpUrl}
              className="w-full h-full rounded-full"
              alt="User Profile"
              width={56}
              height={56}
            />
          )}
        </div>

        <div className="">
          <p className="text-lg text-blue-600">{context?.user?.displayName}</p>
          <p className="text-sm text-indigo-600">@{context?.user?.username}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3 shadow-lg w-full grid grid-cols-2 gap-2 ">
        <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-md overflow-hidden p-2 text-sm flex justify-between">
          Total spins:{" "}
          <span className="text-md text-white font-semibold">{totalSpins}</span>
        </div>
        <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-md overflow-hidden p-2 text-sm flex justify-between items-center">
          Total quiz:{" "}
          <span className="text-md  font-semibold">
            {totalAnswerLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              totalAnswered?.toString()
            )}
          </span>
        </div>
        <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-md overflow-hidden p-2 text-sm flex justify-between">
          ETH:{" "}
          <span className="text-md  font-semibold">
            {balanceLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              balance && balance.formatted.slice(0, 7)
            )}
          </span>
        </div>
        <div className="bg-gradient-to-r text-white from-blue-500 to-blue-600 rounded-md overflow-hidden p-2 text-sm flex justify-between">
          Right answer:{" "}
          <span className="text-md  font-semibold">
            {scoreLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              scores?.toString()
            )}
          </span>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-2xl w-full backdrop-blur-md  overflow-hidden p-3 text-sm shadow-md">
        <h2 className="text-black font-bold">My balance </h2>

        <div className="pt-4 flex flex-col gap-1 max-h-48 overflow-x-auto ">
          {tokens.map((token, index) => (
            <Token {...token} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePfp;
