import { Loader } from "lucide-react";
import React from "react";
import Leader from "./Leader";
import { useQuery } from "@tanstack/react-query";

const Leaderboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboardData"],
    queryFn: async () => {
      const response = await fetch("/api/claim");
      return response.json();
    },
  });

  return (
    <div className="w-full px-4 flex flex-col items-center gap-4">
      <div className="bg-indigo-500/20 backdrop-blur-md w-full p-2 rounded-md mt-2 flex justify-between">
        <h1 className="text-white text-md font-bold text-center">Username</h1>
        <h1 className="text-white text-md font-bold text-center">Earned</h1>
      </div>

      {isLoading && (
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <Loader className="animate-spin text-white" />
        </div>
      )}

      <div className="w-full flex flex-col backdrop-blur-md bg-indigo-500/20 rounded-md">
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
  );
};

export default Leaderboard;
