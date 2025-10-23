import Image from "next/image";
import React from "react";
import { formatUnits, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";

type TokenProps = {
  name: string;
  code: string;
  img: string;
  address: `0x${string}` | undefined;
  decimal: number;
};

const Token = ({ name, code, img, address, decimal }: TokenProps) => {
  const { address: userAddress } = useAccount();
  const { data: balance } = useBalance({
    address: userAddress,
    token: address,
  });
  return (
    <div className="flex items-center justify-between p-2 backdrop-blur-md rounded-md">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full h-6 w-6"
          src={img}
          alt="token img"
          width={24}
          height={24}
        />
        <div>
          <h2 className="text-sm font-semibold text-gray-100">{name}</h2>
          <p className="text-xs text-indigo-200">{code}</p>
        </div>
      </div>

      <div className="text-gray-100">
        {balance ? balance.formatted.slice(0, 6) : "0.00"}
      </div>
    </div>
  );
};

export default Token;
