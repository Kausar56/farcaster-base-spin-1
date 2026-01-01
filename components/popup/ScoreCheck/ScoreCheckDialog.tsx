import Modal from "@/components/common/Modal";
import { useFrame } from "@/components/farcaster-provider";
import { Gift, TrendingUp, X } from "lucide-react";
import React from "react";

const ScoreCheckDialog = ({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { actions } = useFrame();
  const handleClose = () => {
    setShow(false);
    localStorage.setItem("hasOpenedBlindBox2", "true");
  };

  const handleCheckScore = async () => {
    if (!actions) return;
    try {
      await actions.openMiniApp({
        url: "https://farcaster.xyz/miniapps/wLLjqojZVubo/alchemy",
      });
    } catch (err) {
      console.log(err);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal>
      <div className="bg-gradient-to-tr from-blue-600 to-blue-500 relative rounded-2xl p-4 text-center max-w-md w-full">
        <span
          onClick={handleClose}
          className="absolute right-3 top-3 text-red-500 p-1 cursor-pointer duration-75 hover:bg-white/20 rounded-full"
        >
          <X size={24} />
        </span>
        <Gift className="mx-auto mb-4 text-yellow-500" size={48} />
        <h2 className="text-3xl font-bold mb-4 text-white">Open Blind Box</h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-md font-bold text-gray-100">
            Open mystery boxes, claim rewards, and boost your Alchemy points.
          </span>
        </div>

        <button
          onClick={handleCheckScore}
          className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-600 rounded-full font-semibold hover:shadow-lg animate-bounce transition-shadow"
        >
          Open Blind Box <Gift />
        </button>
      </div>
    </Modal>
  );
};

export default ScoreCheckDialog;
