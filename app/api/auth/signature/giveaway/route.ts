import { NextRequest, NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { keccak256, encodePacked, parseEther } from "viem";
import { contractAbi } from "@/abi/abi";

export async function POST(request: NextRequest) {
  const { userAddress, username } = await request.json();

  // Validate input
  if (!userAddress || !username) {
    return NextResponse.json(
      { error: "Invalid input", isSuccess: false },
      { status: 400 }
    );
  }

  const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY;
  const NEYNAR_KEY = process.env.NEYNAR_API_KEY;
  if (!SERVER_PRIVATE_KEY || !NEYNAR_KEY) {
    return NextResponse.json(
      { error: "Server configuration error", isSuccess: false },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.neynar.com/v2/farcaster/user/by_username/?username=${username}`;
    const options = {
      method: "GET",
      headers: { "x-api-key": `${NEYNAR_KEY}` },
      body: undefined,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const userFid = data?.user?.fid;

    if (!userFid) {
      return NextResponse.json(
        { error: "User fid not found!", isSuccess: false },
        { status: 400 }
      );
    }

    const account = privateKeyToAccount(SERVER_PRIVATE_KEY as `0x${string}`);
    const contractAddress = contractAbi.Giveaway.address; // Your contract address

    // Create the message hash
    const structuredMessageHash = keccak256(
      encodePacked(
        ["address", "uint256", "address"],
        [userAddress, BigInt(userFid), contractAddress]
      )
    );

    // Sign the message
    const signature = await account.signMessage({
      message: { raw: structuredMessageHash },
    });
    console.log(signature);

    return NextResponse.json(
      { signature, fid: userFid, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unauthorized", isSuccess: false },
      { status: 401 }
    );
  }
}
