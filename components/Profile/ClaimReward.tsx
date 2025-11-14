import React from "react";
import XPRewardCard from "./XPRewardCard";

const rewardsData = [
  { id: 1, price: 10000, amount: 5 },
  { id: 2, price: 5000, amount: 2 },
  { id: 3, price: 2500, amount: 1 },
  { id: 4, price: 2000, amount: 0.5 },
  { id: 5, price: 1000, amount: 0.3 },
  { id: 6, price: 500, amount: 0.1 },
];

const ClaimReward = () => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-lg w-full">
      <h3 className="font-semibold text-gray-800 mb-4">Claim Reward</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {rewardsData.map((reward) => (
          <XPRewardCard
            price={reward.price}
            amount={reward.amount}
            id={reward.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimReward;
