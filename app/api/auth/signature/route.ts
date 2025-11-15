import { NextRequest, NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts";
import { keccak256, encodePacked, parseEther } from "viem";
import { contractAbi } from "@/abi/abi";

export async function POST(request: NextRequest) {
  const { userAddress, amount } = await request.json();

  // Validate input
  if (!userAddress || !amount) {
    return NextResponse.json(
      { error: "Invalid input", isSuccess: false },
      { status: 400 }
    );
  }

  const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY;
  if (!SERVER_PRIVATE_KEY) {
    return NextResponse.json(
      { error: "Server configuration error", isSuccess: false },
      { status: 500 }
    );
  }
  const account = privateKeyToAccount(SERVER_PRIVATE_KEY as `0x${string}`);
  console.log("Signing for address:", account.address);
  const timestampMs = Date.now();
  const nonce = BigInt(timestampMs);
  const parseAmount = parseEther(`${amount}`);
  const contractAddress = contractAbi.claimPrize.address; // Your contract address

  // Create the message hash
  const structuredMessageHash = keccak256(
    encodePacked(
      ["address", "uint256", "uint256", "address"],
      [userAddress, parseAmount, nonce, contractAddress]
    )
  );

  try {
    // Sign the message
    const signature = await account.signMessage({
      message: { raw: structuredMessageHash },
    });

    console.log({ userAddress, amount, signature });

    return NextResponse.json(
      { signature, nonce: nonce.toString(), isSuccess: true },
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
