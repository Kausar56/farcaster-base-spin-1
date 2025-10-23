import { Calendar, Target } from "lucide-react";
import React from "react";

type SpinDashboardProps = {
  dailySpins: number;
  totalSpins: number;
};

const SpinDashboard = ({ dailySpins, totalSpins }: SpinDashboardProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 text-center">
        <h3 className="text-white text-sm font-semibold mb-2">Daily Spins</h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-yellow-300">{dailySpins}/5</p>
          <Calendar className=" text-yellow-300" size={24} />
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 text-center">
        <h3 className="text-white text-sm font-semibold mb-2">Total Spins</h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-blue-700">{totalSpins}</p>
          <Target className=" text-blue-700" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SpinDashboard;
