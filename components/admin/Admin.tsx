import { contractAbi } from "@/abi/abi";
import React from "react";
import { useWriteContract } from "wagmi";
import AddQuestionPanel from "./AddQuestion";
import ContractBalance from "./ContractBalance";

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
    <div className="w-full px-4 space-y-4">
      <ContractBalance />

      <AddQuestionPanel />
    </div>
  );
};

export default Admin;
