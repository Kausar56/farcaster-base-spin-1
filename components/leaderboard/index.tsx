import { Loader } from "lucide-react";
import React from "react";
import Leader from "./Leader";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "../common/AppHeader";

const Leaderboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboardData"],
    queryFn: async () => {
      const response = await fetch("/api/claim");
      return response.json();
    },
  });

  return (
    <>
      <AppHeader headerName="Leaderboard" />
      <div className="w-full px-4 flex flex-col items-center gap-4 mb-4  ">
        <div className="w-full bg-white rounded-xl  shadow-lg -mt-4 mb-16">
          <div className="py-4 w-full flex justify-between px-4">
            <h1 className="text-gray-800 text-md font-bold text-center">
              User Rank
            </h1>

            <h1 className="text-gray-800 text-md font-bold text-center">
              Invited
            </h1>
            <h1 className="text-gray-800 text-md font-bold text-center">
              BXP Earned
            </h1>
          </div>

          {isLoading && (
            <div className="w-full flex flex-col items-center justify-center">
              <Loader className="animate-spin text-blue-600 h-8 w-8" />
            </div>
          )}

          {!isLoading && data && (
            <div className="w-full flex flex-col gap-2 bg-white rounded-xl p-3 shadow-lg ">
              {data?.users?.map(
                (
                  user: {
                    fid: number;
                    address: string;
                    earned: number;
                    username: string;
                    pfp: string;
                    invited: number;
                  },
                  index: number
                ) => (
                  <Leader
                    key={index}
                    leader={{
                      fid: user.fid,
                      address: user.address,
                      earned: user.earned,
                      username: user.username,
                      index: index + 1,
                      pfp: user.pfp,
                      invited: user.invited,
                    }}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
