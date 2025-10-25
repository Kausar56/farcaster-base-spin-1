import React from "react";

const DemoControls = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300">
      <p className="text-xs text-gray-600 mb-3 text-center">Demo Controls</p>
      <button
        // onClick={toggleCooldown}
        className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-medium"
      >
        {/* {status.isInCooldown ? "End Cooldown" : "Start Cooldown"} */}
      </button>
    </div>
  );
};

export default DemoControls;
