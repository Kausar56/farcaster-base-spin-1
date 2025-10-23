import { contractAbi } from "@/abi/abi";
import React from "react";
import AddQuestionPanel from "./AddQuestion";
import ContractBalance from "./ContractBalance";

const Admin = () => {
  return (
    <div className="w-full px-4 space-y-4">
      <ContractBalance />

      <AddQuestionPanel />

      <div className="bg-indigo-200/20 text-sm text-gray-200 backdrop-blur-md shadow-sm rounded-xl w-full p-4 space-y-2">
        <p>
          Spin contract address:{" "}
          <span className="text-indigo-500">
            {contractAbi.claimPrize.address}
          </span>
        </p>
        <p>
          Quiz contract address:{" "}
          <span className="text-indigo-500">
            {contractAbi.quizGame.address}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Admin;
