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
      <div className="w-full px-4 flex flex-col items-center gap-4 mt-4 mb-8">
        <div className="bg-white rounded-xl px-6 py-2 shadow-lg w-full flex justify-between">
          <h1 className="text-gray-800 text-md font-bold text-center">
            Username
          </h1>
          <h1 className="text-gray-800 text-md font-bold text-center">
            Earned
          </h1>
        </div>

        {isLoading && (
          <div className="w-full flex flex-col items-center justify-center mt-4">
            <Loader className="animate-spin text-white" />
          </div>
        )}

        <div className="w-full flex flex-col bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-4 shadow-lg">
          {data &&
            data?.users?.map(
              (
                user: {
                  fid: number;
                  address: string;
                  earned: number;
                  username: string;
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
                  }}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
