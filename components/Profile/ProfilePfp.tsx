import React from "react";
import { useFrame } from "../farcaster-provider";
import RefundAndClaimBtn from "./RefundAndClaimBtn";
// import UserHIstroy from "./UserHIstroy";
import XpAndStreak from "./XpAndStreak";
import ClaimReward from "./ClaimReward";
import FlexibleBXPSwap from "../common/FlexibleBXPSwap";
import Invite from "./Invite";

const ProfilePfp = () => {
  const { context } = useFrame();

  return (
    <div className="flex flex-col items-center gap-2 px-4 -mt-4">
      <div className="bg-white rounded-2xl p-3 shadow-lg w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 ring-2 ring-blue-600 rounded-full overflow-hidden bg-indigo-500">
            {context?.user?.pfpUrl && (
              <img
                src={context?.user?.pfpUrl}
                className="w-full h-full rounded-full"
                alt="User Profile"
                width={56}
                height={56}
              />
            )}
          </div>

          <div className="">
            <p className="text-md text-blue-600 font-bold">
              {context?.user?.displayName &&
              context?.user?.displayName.length > 12
                ? context?.user?.displayName.slice(0, 12) + "..."
                : context?.user?.displayName || "Unnamed User"}
            </p>
            <p className="text-xs text-indigo-600">
              @
              {context?.user?.username && context?.user?.username.length > 12
                ? context?.user?.username.slice(0, 12) + "..."
                : context?.user?.username}
            </p>
            {/* <p className="text-xs bg-blue-100 rounded-2xl text-blue-900 px-2 py-1">
            Invite code:{" "}
            <span className="font-semibold"> {context?.user?.fid}</span>
          </p> */}
          </div>
        </div>

        <XpAndStreak />
      </div>

      {/* Refund & claim */}
      {/* <RefundAndClaimBtn /> */}

      <Invite />

      {/* User history */}
      {/* <UserHIstroy /> */}
      <FlexibleBXPSwap />

      {/* Claim reward */}
      {/* <ClaimReward /> */}
    </div>
  );
};

export default ProfilePfp;
