// export const testnetAbi = {
//   claimPrize: {
//     address: "0x9262db9865e3a179910b1f1e314b6a8a07ba255f",
//     abi: [
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "initialOwner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_signerAddress",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_bxpTokenAddress",
//             type: "address",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [],
//         name: "AmountExceedsMaxClaim",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "DailyLimitReached",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "DailyRewardAlreadyClaimed",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ECDSAInvalidSignature",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "length",
//             type: "uint256",
//           },
//         ],
//         name: "ECDSAInvalidSignatureLength",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "bytes32",
//             name: "s",
//             type: "bytes32",
//           },
//         ],
//         name: "ECDSAInvalidSignatureS",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "EnforcedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ExpectedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientContractBalance",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InvalidAmount",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InvalidSignature",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "NoBalanceToWithdraw",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "NonceAlreadyUsed",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "OwnableInvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "OwnableUnauthorizedAccount",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ReentrancyGuardReentrantCall",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//         ],
//         name: "SafeERC20FailedOperation",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ZeroAddress",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "count",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "timestamp",
//             type: "uint256",
//           },
//         ],
//         name: "DailyClaimed",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "EthWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldMax",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newMax",
//             type: "uint256",
//           },
//         ],
//         name: "MaxActionsUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldMax",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newMax",
//             type: "uint256",
//           },
//         ],
//         name: "MaxClaimUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "previousOwner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Paused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "oldSigner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newSigner",
//             type: "address",
//           },
//         ],
//         name: "SignerUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "nonce",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "timestamp",
//             type: "uint256",
//           },
//         ],
//         name: "SpinPrizeClaimed",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "TokensWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Unpaused",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "DAILY_COOLDOWN",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "bxpToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_amount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "_nonce",
//             type: "uint256",
//           },
//           {
//             internalType: "bytes",
//             name: "_signature",
//             type: "bytes",
//           },
//         ],
//         name: "claimSpinWinPrize",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_nonce",
//             type: "uint256",
//           },
//           {
//             internalType: "bytes",
//             name: "_signature",
//             type: "bytes",
//           },
//         ],
//         name: "dailyClaim",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "dailyClaimAmount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getContractTokenBalance",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "balance",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "getUserClaimData",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "lastClaimDay",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "claimToday",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "remainingClaims",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "isDailyClaimAvailable",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "available",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "timeUntilNext",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "lastActionTime",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "maxActionsPerDay",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "maxClaim",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "pause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "paused",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_dailyClaimAmount",
//             type: "uint256",
//           },
//         ],
//         name: "setDailyClaimAmount",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_maxActionsPerDay",
//             type: "uint256",
//           },
//         ],
//         name: "setMaxActionsPerDay",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_maxClaim",
//             type: "uint256",
//           },
//         ],
//         name: "setMaxClaim",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "_newSigner",
//             type: "address",
//           },
//         ],
//         name: "setSignerAddress",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "signerAddress",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalEarned",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "unpause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "usedNonces",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "userGMCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "users",
//         outputs: [
//           {
//             internalType: "uint64",
//             name: "lastClaimDay",
//             type: "uint64",
//           },
//           {
//             internalType: "uint64",
//             name: "claimToday",
//             type: "uint64",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdrawEth",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "withdrawToken",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         stateMutability: "payable",
//         type: "receive",
//       },
//     ],
//   },
//   DailyLottery: {
//     address: "0x72c805415e9bf9931b13f3bd42ee17a73319b5c8",
//     abi: [
//       {
//         inputs: [],
//         name: "acceptOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address[]",
//             name: "winners",
//             type: "address[]",
//           },
//         ],
//         name: "batchWithdrawPrizes",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address payable",
//             name: "to",
//             type: "address",
//           },
//         ],
//         name: "emergencyWithdrawAll",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "initialOwner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "vrfCoordinator",
//             type: "address",
//           },
//           {
//             internalType: "bytes32",
//             name: "keyHash",
//             type: "bytes32",
//           },
//           {
//             internalType: "uint256",
//             name: "subscriptionId",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "nativePayment",
//             type: "bool",
//           },
//           {
//             internalType: "address",
//             name: "_prizeToken",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "_prizePoolAmount",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [],
//         name: "EnforcedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ExpectedPause",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "have",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "want",
//             type: "address",
//           },
//         ],
//         name: "OnlyCoordinatorCanFulfill",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "have",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "coordinator",
//             type: "address",
//           },
//         ],
//         name: "OnlyOwnerOrCoordinator",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ReentrancyGuardReentrantCall",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//         ],
//         name: "SafeERC20FailedOperation",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ZeroAddress",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldPeriod",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newPeriod",
//             type: "uint256",
//           },
//         ],
//         name: "CooldownPeriodUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "vrfCoordinator",
//             type: "address",
//           },
//         ],
//         name: "CoordinatorSet",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "depositPrizeTokens",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldInterval",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newInterval",
//             type: "uint256",
//           },
//         ],
//         name: "DrawIntervalUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "requestId",
//             type: "uint256",
//           },
//         ],
//         name: "DrawPendingDueToPause",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "emergencyWithdrawTokens",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "enter",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//         ],
//         name: "Entered",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "exitCooldown",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "forceDraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "caller",
//             type: "address",
//           },
//         ],
//         name: "OwnerForcedDraw",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferRequested",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "pause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Paused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//         ],
//         name: "PendingDrawCompleted",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "bytes",
//             name: "performData",
//             type: "bytes",
//           },
//         ],
//         name: "performUpkeep",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "winner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "PrizeAllocated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newAmount",
//             type: "uint256",
//           },
//         ],
//         name: "PrizePoolAmountUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "winner",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "PrizeWithdrawn",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "requestId",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256[]",
//             name: "randomWords",
//             type: "uint256[]",
//           },
//         ],
//         name: "rawFulfillRandomWords",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "participants",
//             type: "uint256",
//           },
//         ],
//         name: "RoundCancelled",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "startTime",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "drawTime",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "prizePool",
//             type: "uint256",
//           },
//         ],
//         name: "RoundStarted",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint32",
//             name: "newLimit",
//             type: "uint32",
//           },
//         ],
//         name: "setCallbackGasLimit",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "newPeriod",
//             type: "uint256",
//           },
//         ],
//         name: "setCooldownPeriod",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "_vrfCoordinator",
//             type: "address",
//           },
//         ],
//         name: "setCoordinator",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "newInterval",
//             type: "uint256",
//           },
//         ],
//         name: "setDrawInterval",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "newAmount",
//             type: "uint256",
//           },
//         ],
//         name: "setPrizePoolAmount",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "TokensDeposited",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Unpaused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "requestId",
//             type: "uint256",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256[]",
//             name: "randomWords",
//             type: "uint256[]",
//           },
//         ],
//         name: "VRFFulfilled",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "requestId",
//             type: "uint256",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "bytes32",
//             name: "keyHash",
//             type: "bytes32",
//           },
//         ],
//         name: "VRFRequested",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "roundId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "address[]",
//             name: "winners",
//             type: "address[]",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "totalPrizePool",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "winnersCount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "perWinnerAmount",
//             type: "uint256",
//           },
//         ],
//         name: "WinnersDrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "winner",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "string",
//             name: "reason",
//             type: "string",
//           },
//         ],
//         name: "WithdrawalFailed",
//         type: "event",
//       },
//       {
//         stateMutability: "payable",
//         type: "fallback",
//       },
//       {
//         inputs: [],
//         name: "unpause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdrawPrize",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         stateMutability: "payable",
//         type: "receive",
//       },
//       {
//         inputs: [],
//         name: "callbackGasLimit",
//         outputs: [
//           {
//             internalType: "uint32",
//             name: "",
//             type: "uint32",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "checkLastRoundResult",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "won",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "prizeAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "previousRoundId",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "wasCancelled",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "checkPendingPrize",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "failedAttempts",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "bytes",
//             name: "",
//             type: "bytes",
//           },
//         ],
//         name: "checkUpkeep",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "upkeepNeeded",
//             type: "bool",
//           },
//           {
//             internalType: "bytes",
//             name: "performData",
//             type: "bytes",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "_roundId",
//             type: "uint256",
//           },
//         ],
//         name: "checkWinStatus",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "won",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "prizeAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "participated",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "cooldownPeriod",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "drawInterval",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "failedPaymentCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getDrawStatus",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "timeUntilDraw",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "drawTime",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "canDrawNow",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "participantCount",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "currentPrizePool",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "meetsMinimum",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "expectedWinners",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "estimatedPrizePerWinner",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "inCooldown",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "pendingRequestId",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getFinancialStatus",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "totalTokenBalance",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "pendingPrizes",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "availableTokens",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getLotteryStatus",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "currentRound",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "currentPrizePool",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "currentDrawInterval",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "currentCooldownPeriod",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "inCooldown",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "cooldownEndsAt",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "isPaused",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getParticipantCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getParticipants",
//         outputs: [
//           {
//             internalType: "address[]",
//             name: "",
//             type: "address[]",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_roundId",
//             type: "uint256",
//           },
//         ],
//         name: "getRoundWinners",
//         outputs: [
//           {
//             internalType: "address[]",
//             name: "winners",
//             type: "address[]",
//           },
//           {
//             internalType: "uint256",
//             name: "prizePerWinner",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "totalPot",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "startRound",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "endRound",
//             type: "uint256",
//           },
//         ],
//         name: "getUserHistory",
//         outputs: [
//           {
//             internalType: "uint256[]",
//             name: "rounds",
//             type: "uint256[]",
//           },
//           {
//             internalType: "bool[]",
//             name: "wins",
//             type: "bool[]",
//           },
//           {
//             internalType: "uint256[]",
//             name: "prizes",
//             type: "uint256[]",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "hasEntered",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "hasParticipated",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "i_subscriptionId",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "isInCooldown",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "isRoundCancelled",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "isWinner",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MAX_CALLBACK_GAS_LIMIT",
//         outputs: [
//           {
//             internalType: "uint32",
//             name: "",
//             type: "uint32",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MAX_COOLDOWN_PERIOD",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MAX_DRAW_INTERVAL",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MIN_CALLBACK_GAS_LIMIT",
//         outputs: [
//           {
//             internalType: "uint32",
//             name: "",
//             type: "uint32",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MIN_COOLDOWN_PERIOD",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MIN_DRAW_INTERVAL",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MIN_PARTICIPANTS",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "nextDrawTime",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "paused",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "pendingWithdrawals",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "prizePoolAmount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "prizeToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "roundId",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "roundPrizePerWinner",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "roundStartTime",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "roundTotalPot",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "roundWinnerCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "roundWinners",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "s_requestId",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "s_vrfCoordinator",
//         outputs: [
//           {
//             internalType: "contract IVRFCoordinatorV2Plus",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalPendingWithdrawals",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//   },
//   Giveaway: {
//     address: "0x72c805415e9bf9931b13f3bd42ee17a73319b5c8",
//     abi: [
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "initialOwner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_signerAddress",
//             type: "address",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "OwnableInvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "OwnableUnauthorizedAccount",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "previousOwner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Paused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Unpaused",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "MAX_CLAIM",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MAX_FIDEPOCH",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_fid",
//             type: "uint256",
//           },
//           {
//             internalType: "bytes",
//             name: "_signature",
//             type: "bytes",
//           },
//         ],
//         name: "claimGiveawayPrize",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "claimedFid",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "diposit",
//         outputs: [],
//         stateMutability: "payable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "fidEpoch",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "pause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "paused",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_max_claim",
//             type: "uint256",
//           },
//         ],
//         name: "setClaimAmount",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_max_user",
//             type: "uint256",
//           },
//         ],
//         name: "setMaxUserClaim",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "_newSigner",
//             type: "address",
//           },
//         ],
//         name: "setSignerAddress",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "signerAddress",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "unpause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "userFids",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         stateMutability: "payable",
//         type: "receive",
//       },
//     ],
//   },
//   BXPToken: {
//     address: "0x10dfa2da2194faad770a2b6d08e469ca2529b4fe",
//   },
//   BXPSwap: {
//     address: "0xb37bfc7f833543f12ae9e59ab2350b8ad7f00b3e",
//     abi: [
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "initialOwner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_bxpToken",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_usdtToken",
//             type: "address",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [],
//         name: "EnforcedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ExpectedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientAllowance",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientBXPBalance",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientUSDTInContract",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InvalidPackageId",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "OwnableInvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "OwnableUnauthorizedAccount",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "PackageNotActive",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ReentrancyGuardReentrantCall",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//         ],
//         name: "SafeERC20FailedOperation",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ZeroAddress",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "BXPWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "previousOwner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "bxpPrice",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "bool",
//             name: "active",
//             type: "bool",
//           },
//         ],
//         name: "PackageUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Paused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "timestamp",
//             type: "uint256",
//           },
//         ],
//         name: "TokensSwapped",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "USDTWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Unpaused",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "burnBXP",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "bxpToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "depositUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getActivePackages",
//         outputs: [
//           {
//             internalType: "uint256[]",
//             name: "packageIds",
//             type: "uint256[]",
//           },
//           {
//             internalType: "uint256[]",
//             name: "bxpPrices",
//             type: "uint256[]",
//           },
//           {
//             internalType: "uint256[]",
//             name: "usdtAmounts",
//             type: "uint256[]",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getContractBalances",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpBalance",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtBalance",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getGlobalStats",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpCollected",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtDistributed",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//         ],
//         name: "getPackage",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpPrice",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "active",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "getUserStats",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpSwapped",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtReceived",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "packages",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpPrice",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "active",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "pause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "paused",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "active",
//             type: "bool",
//           },
//         ],
//         name: "setPackageActive",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//         ],
//         name: "swapBXPForUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalBXPCollected",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "totalBXPSwapped",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalUSDTDistributed",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "totalUSDTReceived",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "unpause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "packageId",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "bxpPrice",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             internalType: "bool",
//             name: "active",
//             type: "bool",
//           },
//         ],
//         name: "updatePackage",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "usdtToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "withdrawBXP",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "withdrawUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//   },
//   ERC20_ABI: {
//     address: "",
//     abi: [
//       {
//         name: "approve",
//         type: "function",
//         stateMutability: "nonpayable",
//         inputs: [
//           { name: "spender", type: "address" },
//           { name: "amount", type: "uint256" },
//         ],
//         outputs: [{ name: "", type: "bool" }],
//       },
//       {
//         name: "allowance",
//         type: "function",
//         stateMutability: "view",
//         inputs: [
//           { name: "owner", type: "address" },
//           { name: "spender", type: "address" },
//         ],
//         outputs: [{ name: "", type: "uint256" }],
//       },
//       {
//         name: "balanceOf",
//         type: "function",
//         stateMutability: "view",
//         inputs: [{ name: "account", type: "address" }],
//         outputs: [{ name: "", type: "uint256" }],
//       },
//     ],
//   },
//   FlexibleBXPSwap: {
//     address: "0x2ec9ddc24c351b5b7e2e39ff350e4f274e8cac30",
//     abi: [
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "initialOwner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_bxpToken",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "_usdtToken",
//             type: "address",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [],
//         name: "BelowMinimumSwap",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "EnforcedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ExpectedPause",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientAllowance",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientBXPBalance",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "InsufficientUSDTInContract",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "OwnableInvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "OwnableUnauthorizedAccount",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ReentrancyGuardReentrantCall",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//         ],
//         name: "SafeERC20FailedOperation",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ZeroAddress",
//         type: "error",
//       },
//       {
//         inputs: [],
//         name: "ZeroAmount",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "BXPWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldMin",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newMin",
//             type: "uint256",
//           },
//         ],
//         name: "MinSwapUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "previousOwner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Paused",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "oldRate",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "newRate",
//             type: "uint256",
//           },
//         ],
//         name: "RateUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "timestamp",
//             type: "uint256",
//           },
//         ],
//         name: "TokensSwapped",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "USDTDeposited",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "USDTWithdrawn",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "Unpaused",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "burnBXP",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "bxpToUsdtRate",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "bxpToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//         ],
//         name: "calculateBXPAmount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//         ],
//         name: "calculateUSDTAmount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "usdtAmount",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//         ],
//         name: "canSwap",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//           {
//             internalType: "string",
//             name: "reason",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "depositUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "token",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "emergencyWithdrawToken",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getContractBalances",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpBalance",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtBalance",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getGlobalStats",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpCollected",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtDistributed",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getRateInfo",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "rate",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "minSwap",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "rateReadable",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "user",
//             type: "address",
//           },
//         ],
//         name: "getUserStats",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "bxpSwapped",
//             type: "uint256",
//           },
//           {
//             internalType: "uint256",
//             name: "usdtReceived",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "minSwapAmount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "pause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "paused",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "newMinAmount",
//             type: "uint256",
//           },
//         ],
//         name: "setMinSwapAmount",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "newRate",
//             type: "uint256",
//           },
//         ],
//         name: "setRate",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "bxpAmount",
//             type: "uint256",
//           },
//         ],
//         name: "swapBXPForUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalBXPCollected",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalUSDTDistributed",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "unpause",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "usdtToken",
//         outputs: [
//           {
//             internalType: "contract IERC20",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "userTotalBXPSwapped",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "userTotalUSDTReceived",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdrawAllBXP",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdrawAllUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "withdrawBXP",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "amount",
//             type: "uint256",
//           },
//         ],
//         name: "withdrawUSDT",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//   },
//   PixelCatNFT: {
//     address: "0x7d453c58b2239de471f8bc5225267738d7b23ab8",
//     abi: [
//       {
//         inputs: [
//           {
//             internalType: "string",
//             name: "name",
//             type: "string",
//           },
//           {
//             internalType: "string",
//             name: "symbol",
//             type: "string",
//           },
//           {
//             internalType: "string",
//             name: "baseTokenURI",
//             type: "string",
//           },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "sender",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "ERC721IncorrectOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "operator",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "ERC721InsufficientApproval",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "approver",
//             type: "address",
//           },
//         ],
//         name: "ERC721InvalidApprover",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "operator",
//             type: "address",
//           },
//         ],
//         name: "ERC721InvalidOperator",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "ERC721InvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "receiver",
//             type: "address",
//           },
//         ],
//         name: "ERC721InvalidReceiver",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "sender",
//             type: "address",
//           },
//         ],
//         name: "ERC721InvalidSender",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "ERC721NonexistentToken",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "OwnableInvalidOwner",
//         type: "error",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "account",
//             type: "address",
//           },
//         ],
//         name: "OwnableUnauthorizedAccount",
//         type: "error",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "approved",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "Approval",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "operator",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "bool",
//             name: "approved",
//             type: "bool",
//           },
//         ],
//         name: "ApprovalForAll",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "string",
//             name: "newBaseURI",
//             type: "string",
//           },
//         ],
//         name: "BaseURIUpdated",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "Minted",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "bool",
//             name: "enabled",
//             type: "bool",
//           },
//         ],
//         name: "MintingStatusChanged",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "previousOwner",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             indexed: true,
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "Transfer",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "MAX_PER_WALLET",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MAX_SUPPLY",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "MINT_PRICE",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "approve",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//         ],
//         name: "balanceOf",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "addr",
//             type: "address",
//           },
//         ],
//         name: "canMint",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "contractURI",
//         outputs: [
//           {
//             internalType: "string",
//             name: "",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address payable",
//             name: "to",
//             type: "address",
//           },
//         ],
//         name: "emergencyWithdraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "getApproved",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "addr",
//             type: "address",
//           },
//         ],
//         name: "getMintedCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "owner",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "operator",
//             type: "address",
//           },
//         ],
//         name: "isApprovedForAll",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "quantity",
//             type: "uint256",
//           },
//         ],
//         name: "mint",
//         outputs: [],
//         stateMutability: "payable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "mintedPerWallet",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "mintingEnabled",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "name",
//         outputs: [
//           {
//             internalType: "string",
//             name: "",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "owner",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "quantity",
//             type: "uint256",
//           },
//         ],
//         name: "ownerMint",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "ownerOf",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "remainingSupply",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "safeTransferFrom",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//           {
//             internalType: "bytes",
//             name: "data",
//             type: "bytes",
//           },
//         ],
//         name: "safeTransferFrom",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "operator",
//             type: "address",
//           },
//           {
//             internalType: "bool",
//             name: "approved",
//             type: "bool",
//           },
//         ],
//         name: "setApprovalForAll",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "string",
//             name: "newBaseURI",
//             type: "string",
//           },
//         ],
//         name: "setBaseURI",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "bool",
//             name: "enabled",
//             type: "bool",
//           },
//         ],
//         name: "setMintingEnabled",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "bytes4",
//             name: "interfaceId",
//             type: "bytes4",
//           },
//         ],
//         name: "supportsInterface",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "",
//             type: "bool",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "symbol",
//         outputs: [
//           {
//             internalType: "string",
//             name: "",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "tokenURI",
//         outputs: [
//           {
//             internalType: "string",
//             name: "",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "totalSupply",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "from",
//             type: "address",
//           },
//           {
//             internalType: "address",
//             name: "to",
//             type: "address",
//           },
//           {
//             internalType: "uint256",
//             name: "tokenId",
//             type: "uint256",
//           },
//         ],
//         name: "transferFrom",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "newOwner",
//             type: "address",
//           },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "withdraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//     ],
//   },
// } as const;

export const contractAbi = {
  claimPrize: {
    address: "0xd94535a389ecedb976de7887ebf983c3521ed97d",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "initialOwner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_signerAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "_bxpTokenAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "AmountExceedsMaxClaim",
        type: "error",
      },
      {
        inputs: [],
        name: "DailyLimitReached",
        type: "error",
      },
      {
        inputs: [],
        name: "DailyRewardAlreadyClaimed",
        type: "error",
      },
      {
        inputs: [],
        name: "ECDSAInvalidSignature",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
        ],
        name: "ECDSAInvalidSignatureLength",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "ECDSAInvalidSignatureS",
        type: "error",
      },
      {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientContractBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidAmount",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidSignature",
        type: "error",
      },
      {
        inputs: [],
        name: "NoBalanceToWithdraw",
        type: "error",
      },
      {
        inputs: [],
        name: "NonceAlreadyUsed",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
      },
      {
        inputs: [],
        name: "ZeroAddress",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "count",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "DailyClaimed",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "EthWithdrawn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldMax",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newMax",
            type: "uint256",
          },
        ],
        name: "MaxActionsUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldMax",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newMax",
            type: "uint256",
          },
        ],
        name: "MaxClaimUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "oldSigner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newSigner",
            type: "address",
          },
        ],
        name: "SignerUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "SpinPrizeClaimed",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "TokensWithdrawn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [],
        name: "DAILY_COOLDOWN",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "bxpToken",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes",
          },
        ],
        name: "claimSpinWinPrize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes",
          },
        ],
        name: "dailyClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "dailyClaimAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getContractTokenBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserClaimData",
        outputs: [
          {
            internalType: "uint256",
            name: "lastClaimDay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimToday",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "remainingClaims",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "isDailyClaimAvailable",
        outputs: [
          {
            internalType: "bool",
            name: "available",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timeUntilNext",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "lastActionTime",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxActionsPerDay",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxClaim",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_dailyClaimAmount",
            type: "uint256",
          },
        ],
        name: "setDailyClaimAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_maxActionsPerDay",
            type: "uint256",
          },
        ],
        name: "setMaxActionsPerDay",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_maxClaim",
            type: "uint256",
          },
        ],
        name: "setMaxClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newSigner",
            type: "address",
          },
        ],
        name: "setSignerAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "signerAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalEarned",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "usedNonces",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userGMCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "users",
        outputs: [
          {
            internalType: "uint64",
            name: "lastClaimDay",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "claimToday",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawEth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
  },
  DailyLottery: {
    address: "0x42b853ab9be89ef36bd166e9ec326f371c9c7bcd",
    abi: [
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
        ],
        name: "batchWithdrawPrizes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address payable",
            name: "to",
            type: "address",
          },
        ],
        name: "emergencyWithdrawAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "initialOwner",
            type: "address",
          },
          {
            internalType: "address",
            name: "vrfCoordinator",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "keyHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "subscriptionId",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "nativePayment",
            type: "bool",
          },
          {
            internalType: "address",
            name: "_prizeToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_prizePoolAmount",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "have",
            type: "address",
          },
          {
            internalType: "address",
            name: "want",
            type: "address",
          },
        ],
        name: "OnlyCoordinatorCanFulfill",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "have",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "coordinator",
            type: "address",
          },
        ],
        name: "OnlyOwnerOrCoordinator",
        type: "error",
      },
      {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
      },
      {
        inputs: [],
        name: "ZeroAddress",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldPeriod",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newPeriod",
            type: "uint256",
          },
        ],
        name: "CooldownPeriodUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "vrfCoordinator",
            type: "address",
          },
        ],
        name: "CoordinatorSet",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "depositPrizeTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldInterval",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newInterval",
            type: "uint256",
          },
        ],
        name: "DrawIntervalUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
        ],
        name: "DrawPendingDueToPause",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "emergencyWithdrawTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "enter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
        ],
        name: "Entered",
        type: "event",
      },
      {
        inputs: [],
        name: "exitCooldown",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "forceDraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "caller",
            type: "address",
          },
        ],
        name: "OwnerForcedDraw",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "OwnershipTransferRequested",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
        ],
        name: "PendingDrawCompleted",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "performData",
            type: "bytes",
          },
        ],
        name: "performUpkeep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "PrizeAllocated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newAmount",
            type: "uint256",
          },
        ],
        name: "PrizePoolAmountUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "PrizeWithdrawn",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "randomWords",
            type: "uint256[]",
          },
        ],
        name: "rawFulfillRandomWords",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "participants",
            type: "uint256",
          },
        ],
        name: "RoundCancelled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "drawTime",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "prizePool",
            type: "uint256",
          },
        ],
        name: "RoundStarted",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint32",
            name: "newLimit",
            type: "uint32",
          },
        ],
        name: "setCallbackGasLimit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newPeriod",
            type: "uint256",
          },
        ],
        name: "setCooldownPeriod",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_vrfCoordinator",
            type: "address",
          },
        ],
        name: "setCoordinator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newInterval",
            type: "uint256",
          },
        ],
        name: "setDrawInterval",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newAmount",
            type: "uint256",
          },
        ],
        name: "setPrizePoolAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "TokensDeposited",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256[]",
            name: "randomWords",
            type: "uint256[]",
          },
        ],
        name: "VRFFulfilled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes32",
            name: "keyHash",
            type: "bytes32",
          },
        ],
        name: "VRFRequested",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "roundId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "totalPrizePool",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "winnersCount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "perWinnerAmount",
            type: "uint256",
          },
        ],
        name: "WinnersDrawn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        name: "WithdrawalFailed",
        type: "event",
      },
      {
        stateMutability: "payable",
        type: "fallback",
      },
      {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawPrize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
      {
        inputs: [],
        name: "callbackGasLimit",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "checkLastRoundResult",
        outputs: [
          {
            internalType: "bool",
            name: "won",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "previousRoundId",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "wasCancelled",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "checkPendingPrize",
        outputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "failedAttempts",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "checkUpkeep",
        outputs: [
          {
            internalType: "bool",
            name: "upkeepNeeded",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "performData",
            type: "bytes",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_roundId",
            type: "uint256",
          },
        ],
        name: "checkWinStatus",
        outputs: [
          {
            internalType: "bool",
            name: "won",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "participated",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "cooldownPeriod",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "drawInterval",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "failedPaymentCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getDrawStatus",
        outputs: [
          {
            internalType: "uint256",
            name: "timeUntilDraw",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "drawTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "canDrawNow",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "participantCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentPrizePool",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "meetsMinimum",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "expectedWinners",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "estimatedPrizePerWinner",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "inCooldown",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "pendingRequestId",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getFinancialStatus",
        outputs: [
          {
            internalType: "uint256",
            name: "totalTokenBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "pendingPrizes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableTokens",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getLotteryStatus",
        outputs: [
          {
            internalType: "uint256",
            name: "currentRound",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentPrizePool",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentDrawInterval",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCooldownPeriod",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "inCooldown",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "cooldownEndsAt",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getParticipantCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getParticipants",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_roundId",
            type: "uint256",
          },
        ],
        name: "getRoundWinners",
        outputs: [
          {
            internalType: "address[]",
            name: "winners",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "prizePerWinner",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPot",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "startRound",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endRound",
            type: "uint256",
          },
        ],
        name: "getUserHistory",
        outputs: [
          {
            internalType: "uint256[]",
            name: "rounds",
            type: "uint256[]",
          },
          {
            internalType: "bool[]",
            name: "wins",
            type: "bool[]",
          },
          {
            internalType: "uint256[]",
            name: "prizes",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "hasEntered",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "hasParticipated",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "i_subscriptionId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isInCooldown",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "isRoundCancelled",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isWinner",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_CALLBACK_GAS_LIMIT",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_COOLDOWN_PERIOD",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_DRAW_INTERVAL",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MIN_CALLBACK_GAS_LIMIT",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MIN_COOLDOWN_PERIOD",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MIN_DRAW_INTERVAL",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MIN_PARTICIPANTS",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "nextDrawTime",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "pendingWithdrawals",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "prizePoolAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "prizeToken",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "roundId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "roundPrizePerWinner",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "roundStartTime",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "roundTotalPot",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "roundWinnerCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "roundWinners",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "s_requestId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "s_vrfCoordinator",
        outputs: [
          {
            internalType: "contract IVRFCoordinatorV2Plus",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalPendingWithdrawals",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
  Giveaway: {
    address: "0xe4d8bbe603bb852573eb45895db5f302e1d93080",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "initialOwner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_signerAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_CLAIM",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_FIDEPOCH",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_fid",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes",
          },
        ],
        name: "claimGiveawayPrize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "claimedFid",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "diposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "fidEpoch",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_max_claim",
            type: "uint256",
          },
        ],
        name: "setClaimAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_max_user",
            type: "uint256",
          },
        ],
        name: "setMaxUserClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newSigner",
            type: "address",
          },
        ],
        name: "setSignerAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "signerAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "userFids",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
  },
  BXPToken: { address: "0x12fda487aeb2dcf96c7bec0ad0eb7c8d73152d8b", abi: [] },
  ERC20_ABI: {
    address: "0x7",
    abi: [
      {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { name: "spender", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
      },
      {
        name: "allowance",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
        ],
        outputs: [{ name: "", type: "uint256" }],
      },
      {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
  },
  FlexibleBXPSwap: {
    address: "0x8a899a8dd2ecf6312863e578666bc555b080d3a0",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "initialOwner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_bxpToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "_usdcToken",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "BelowMinimumSwap",
        type: "error",
      },
      {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientAllowance",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientBXPBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientUSDTInContract",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "SafeERC20FailedOperation",
        type: "error",
      },
      {
        inputs: [],
        name: "ZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "ZeroAmount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "BXPWithdrawn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldMin",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newMin",
            type: "uint256",
          },
        ],
        name: "MinSwapUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "oldRate",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "RateUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "bxpAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "usdcAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "TokensSwapped",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "USDTDeposited",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "USDTWithdrawn",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "burnBXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "bxpToUsdcRate",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "bxpToken",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "usdtAmount",
            type: "uint256",
          },
        ],
        name: "calculateBXPAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "bxpAmount",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "bxpAmount",
            type: "uint256",
          },
        ],
        name: "calculateUSDTAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "usdtAmount",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "bxpAmount",
            type: "uint256",
          },
        ],
        name: "canSwap",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
          {
            internalType: "string",
            name: "reason",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "depositUSDT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "emergencyWithdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getContractBalances",
        outputs: [
          {
            internalType: "uint256",
            name: "bxpBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtBalance",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getGlobalStats",
        outputs: [
          {
            internalType: "uint256",
            name: "bxpCollected",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtDistributed",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getRateInfo",
        outputs: [
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minSwap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rateReadable",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserStats",
        outputs: [
          {
            internalType: "uint256",
            name: "bxpSwapped",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdtReceived",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "minSwapAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newMinAmount",
            type: "uint256",
          },
        ],
        name: "setMinSwapAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "newRate",
            type: "uint256",
          },
        ],
        name: "setRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "bxpAmount",
            type: "uint256",
          },
        ],
        name: "swapBXPForUSDT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "totalBXPCollected",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalUSDTDistributed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "usdcToken",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userTotalBXPSwapped",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userTotalUSDTReceived",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawAllBXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawAllUSDT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawBXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawUSDT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  PixelCatNFT: {
    address: "0x277e078c1bbacea78f42471c0af6cde36bc911b4",
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "baseTokenURI",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "approver",
            type: "address",
          },
        ],
        name: "ERC721InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "ERC721InvalidOperator",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC721InvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
        ],
        name: "ERC721InvalidReceiver",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "ERC721InvalidSender",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ERC721NonexistentToken",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "string",
            name: "newBaseURI",
            type: "string",
          },
        ],
        name: "BaseURIUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Minted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        name: "MintingStatusChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_PER_WALLET",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_SUPPLY",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MINT_PRICE",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
        ],
        name: "canMint",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "contractURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address payable",
            name: "to",
            type: "address",
          },
        ],
        name: "emergencyWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
        ],
        name: "getMintedCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "mintedPerWallet",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "mintingEnabled",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        name: "ownerMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "remainingSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "newBaseURI",
            type: "string",
          },
        ],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        name: "setMintingEnabled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  BXPSwap: { address: "0x9d453c", abi: [] },
  PixelCatHolderAirdrop: {
    address: "0xec1758915e34067E5EA9e5D97CD9d27961D7A2bc",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_bxpToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "_pixelCatNFT",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ClaimingPaused",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientContractBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidTokenId",
        type: "error",
      },
      {
        inputs: [],
        name: "NFTAlreadyClaimed",
        type: "error",
      },
      {
        inputs: [],
        name: "NotNFTHolder",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        inputs: [],
        name: "UserAlreadyClaimed",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "EmergencyWithdraw",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "newEpoch",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "EpochReset",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "oldContract",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newContract",
            type: "address",
          },
        ],
        name: "NFTContractUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "claimer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "epoch",
            type: "uint256",
          },
        ],
        name: "TokensClaimed",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [],
        name: "CLAIM_AMOUNT",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "bxpToken",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "canClaim",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        name: "canClaimBatch",
        outputs: [
          {
            internalType: "bool[]",
            name: "",
            type: "bool[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "claimAirdropTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "currentEpoch",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "depositBXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "emergencyWithdrawBXP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getContractBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "epoch",
            type: "uint256",
          },
        ],
        name: "getEpochStats",
        outputs: [
          {
            internalType: "uint256",
            name: "totalClaimed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "uniqueNFTsClaimed",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getNFTContract",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getTotalClaimedCurrentEpoch",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "hasUserClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "isNFTClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "epoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "isNFTClaimedInEpoch",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "nftClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pauseClaiming",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pixelCatNFT",
        outputs: [
          {
            internalType: "contract IERC721",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "resetClaims",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "totalClaimedInEpoch",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "uniqueNFTsClaimedInEpoch",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "unpauseClaiming",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_claim_amount",
            type: "uint256",
          },
        ],
        name: "updateClaimAmoun",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newNFTContract",
            type: "address",
          },
        ],
        name: "updateNFTContract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
} as const;
