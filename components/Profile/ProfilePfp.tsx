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
    <div className="flex flex-col items-center gap-2 ">
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

      <div className="text-center">
        <p className="text-lg text-white">{context?.user?.displayName}</p>
        <p className="text-sm text-gray-300">@{context?.user?.username}</p>
      </div>

      <div className="bg-indigo-200/20 text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full grid grid-cols-2 gap-2 p-3">
        <div className="backdrop-blur-md rounded-md overflow-hidden p-2 text-sm flex justify-between">
          Total spins:{" "}
          <span className="text-md text-indigo-200 font-semibold">
            {totalSpins}
          </span>
        </div>
        <div className="backdrop-blur-md rounded-md overflow-hidden p-2 text-sm flex justify-between items-center">
          Total quiz:{" "}
          <span className="text-md text-indigo-200 font-semibold">
            {totalAnswerLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              totalAnswered?.toString()
            )}
          </span>
        </div>
        <div className="backdrop-blur-md rounded-md overflow-hidden p-2 text-sm flex justify-between">
          MON:{" "}
          <span className="text-md text-indigo-200 font-semibold">
            {balanceLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              balance && balance.formatted.slice(0, 6)
            )}
          </span>
        </div>
        <div className="backdrop-blur-md rounded-md overflow-hidden p-2 text-sm flex justify-between">
          Right answer:{" "}
          <span className="text-md text-indigo-200 font-semibold">
            {scoreLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              scores?.toString()
            )}
          </span>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-indigo-300/20 w-full backdrop-blur-md rounded-md overflow-hidden p-2 text-sm shadow-md">
        <h2 className="text-white font-bold">My balance </h2>

        <div className="pt-4 flex flex-col gap-1 max-h-48 overflow-x-auto ">
          {tokens.map((token) => (
            <Token {...token} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePfp;
