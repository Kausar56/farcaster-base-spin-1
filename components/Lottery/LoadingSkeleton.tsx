import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="px-4 -mt-4 space-y-4">
      <div className="bg-slate-300 rounded-2xl px-6 py-2 shadow-lg animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-5 text-blue-600 bg-slate-400 rounded-full"></span>
          <h3 className="font-semibold text-gray-800 h-3 w-full bg-slate-400">
            {/* Draw Countdown Round #2 */}
          </h3>
        </div>
        <div className="bg-slate-400 rounded-xl p-2 flex flex-col justify-center items-center">
          <div className="mb-1 opacity-90 h-4 w-2/3 bg-slate-500 rounded-lg">
            {/* Time Remaining */}
          </div>
          <div className="rounded-lg mb-1 h-6 w-1/2 bg-slate-500">
            {/* {remaining < 1 ? "Waiting..." : formattedTime} */}
          </div>
          <div className="rounded-lg opacity-75 h-4 w-full bg-slate-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-pulse">
        <div className="bg-slate-400 rounded-xl px-4 py-2 shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-slate-500 rounded-full" />

            <div className="h-3 w-full bg-slate-500"></div>
          </div>
          <div className="h-5 w-1/3 bg-slate-500 mt-1">
            {/* {participantCount} */}
          </div>

          <div className="h-3 w-1/2 bg-slate-500 mt-2"></div>
        </div>
        <div className="bg-slate-400 rounded-xl px-4 py-2 shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-slate-500 rounded-full" />

            <div className="h-3 w-full bg-slate-500"></div>
          </div>
          <div className="h-5 w-1/3 bg-slate-500 mt-1">
            {/* {participantCount} */}
          </div>

          <div className="h-3 w-1/2 bg-slate-500 mt-2"></div>
        </div>
      </div>

      <div className="w-full h-14 bg-slate-400 rounded-2xl animate-pulse"></div>
    </div>
  );
};

export default LoadingSkeleton;
