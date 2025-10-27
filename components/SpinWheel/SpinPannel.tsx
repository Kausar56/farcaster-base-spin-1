import { Calendar, Target } from "lucide-react";
import React from "react";

type SpinDashboardProps = {
  dailySpins: number;
  totalSpins: number;
};

const SpinDashboard = ({ dailySpins, totalSpins }: SpinDashboardProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 -mt-4 bg-white rounded-2xl shadow-lg p-3 mx-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-2 text-center">
        <h3 className="text-white text-sm font-semibold mb-2">Daily Spins</h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-yellow-300">{dailySpins}/2</p>
          <Calendar className=" text-yellow-300" size={24} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-2 text-center">
        <h3 className="text-white text-sm font-semibold mb-2">Total Spins</h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-white">{totalSpins}</p>
          <Target className=" text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SpinDashboard;
