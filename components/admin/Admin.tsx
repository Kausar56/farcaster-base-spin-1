import { contractAbi } from "@/abi/abi";
import React from "react";
import { useWriteContract } from "wagmi";

const Admin = () => {
  const { writeContract } = useWriteContract();

  const AddQuestion = () => {
    writeContract({
      abi: contractAbi.quizGame.abi,
      address: contractAbi.quizGame.address,
      functionName: "addQuestion",
      args: [
        "Monad’s vision focuses on:",
        [
          "Scalability & Efficiency",
          "Gaming only",
          "NFTs only",
          "Payments only",
        ],
        0,
      ],
    });
  };
  return (
    <div className="w-full">
      <button onClick={AddQuestion} className="py-2 bg-black">
        Add Question
      </button>
    </div>
  );
};

export default Admin;
