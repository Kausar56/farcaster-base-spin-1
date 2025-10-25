import React from "react";

const InfoCards = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
      <h4 className="font-semibold text-gray-800 mb-3 text-sm">How It Works</h4>
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex gap-2">
          <span className="text-blue-600 font-bold">1.</span>
          <span>Enter with 0.0001 ETH (one entry per round)</span>
        </div>
        <div className="flex gap-2">
          <span className="text-blue-600 font-bold">2.</span>
          <span>Wait for draw countdown (minimum 5 participants)</span>
        </div>
        <div className="flex gap-2">
          <span className="text-blue-600 font-bold">3.</span>
          <span>Winners selected randomly, receive instant payout</span>
        </div>
        <div className="flex gap-2">
          <span className="text-blue-600 font-bold">4.</span>
          <span>3-hour cooldown, then new round begins!</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
