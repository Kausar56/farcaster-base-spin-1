import { Loader, Settings } from "lucide-react";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="w-full px-4 flex flex-col items-center gap-4">
      <div className="bg-indigo-500/20 backdrop-blur-md w-full p-2 rounded-md">
        <h1 className="text-white text-xl font-bold text-center">
          Leaderboard
        </h1>
      </div>

      <h3 className="text-center text-gray-300 font-semibold mt-4">
        Coming soon!
      </h3>

      <Settings
        size={28}
        className="text-center text-yellow-500 animate-spin"
      />
    </div>
  );
};

export default Leaderboard;
