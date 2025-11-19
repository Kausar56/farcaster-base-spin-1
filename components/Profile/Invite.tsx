import { Clipboard, Group, Share, Trophy, Users } from "lucide-react";
import React from "react";
import { useFrame } from "../farcaster-provider";
import toast from "react-hot-toast";

const Invite = () => {
  const { authData, context, actions } = useFrame();

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Invite code copied");
      console.log("Copied to clipboard:", text);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
      console.error("Failed to copy:", err);
    }
  }

  const shareInviteCode = () => {
    actions?.composeCast({
      text: `My invite code is ${context?.user?.fid}. Use it to get 50 BXP!

    Join me and let's spin to win together on Base Spin! 🎰

    Try it now 👇`,
      embeds: ["https://farcaster.xyz/miniapps/OVGXH7QGFT1j/base-spin"],
    });
  };

  return (
    <div className="w-full bg-primary rounded-2xl p-3 shadow-lg text-white">
      <div className="flex justify-between items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <h3 className="font-semibold">Invite friends</h3>
        </div>

        <div>
          <Share
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform duration-75"
            onClick={shareInviteCode}
          />
        </div>
      </div>

      <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-100 mb-1">Invited</span>
          <span className="text-md font-bold">{authData?.invited}</span>
        </div>
        {/* <div className="h-px bg-white/20"></div> */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-blue-100 mb-1">Pending rewards</span>
          <span className="text-md font-bold">
            {authData?.refer_income} BXP
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-blue-100 mb-1">Invite code</div>
          <div className="flex items-center gap-1 text-md font-bold text-yellow-300">
            <span>{context?.user?.fid}</span>
            <Clipboard
              onClick={() =>
                copyText(
                  context?.user?.fid ? context?.user?.fid.toString() : ""
                )
              }
              className="h-4 w-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <p className="text-white text-center text-xs mt-1">
        Invite rewards claim coming soon...
      </p>
    </div>
  );
};

export default Invite;
