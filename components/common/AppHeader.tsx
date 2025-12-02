import { Sparkles, TrendingUp } from "lucide-react";
import React from "react";
import ConnectedAddress from "./ConnectedAddress";
import { useFrame } from "../farcaster-provider";

const AppHeader = ({ headerName }: { headerName: string }) => {
  const { actions } = useFrame();
  const handleCheckScore = async () => {
    if (!actions) return;
    try {
      await actions.openMiniApp({
        url: "https://farcaster.xyz/miniapps/SpHID4BP6Z3b/farstate-ai",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 pb-6 pt-3 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-lg font-bold">{headerName}</h1>
        </div>
        {/* <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          Round #15
        </div> */}
        <div className="flex items-center gap-2">
          <ConnectedAddress />
          <button
            onClick={handleCheckScore}
            className="w-7 h-7 flex ring ring-blue-200 justify-center items-center text-sm bg-blue-900 text-white rounded-full"
          >
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* <p className="text-blue-100 text-sm">Win big with just 0.0001 ETH!</p> */}
    </div>
  );
};

export default AppHeader;
