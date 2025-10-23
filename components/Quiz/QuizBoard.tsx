import React, { useEffect, useState } from "react";
import QuizSubmitBtn from "./QuizSubmitBtn";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { contractAbi } from "@/abi/abi";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import { Loader } from "lucide-react";

const QuizBoard = () => {
  const { quizGame } = contractAbi;
  const { address } = useAccount();
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(false);
  const [isWaitingForEvent, setIsWaitingForEvent] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const {
    writeContractAsync,
    isPending,
    isSuccess: isSubmissionSuccess,
  } = useWriteContract();

  const { data, isLoading } = useReadContract({
    abi: quizGame.abi,
    address: quizGame.address,
    functionName: "getTodayQuestion",
  });

  // useWatchContractEvent({
  //   address: quizGame.address,
  //   abi: quizGame.abi,
  //   eventName: "AnswerChecked",
  //   args: { player: address },
  //   poll: true,
  //   pollingInterval: 1000,
  //   onLogs(logs) {
  //     console.log("new log: ", logs);

  //     logs.forEach((log) => {
  //       console.log("Processing log:", log);
  //       console.log("Log args:", log.args);

  //       const success = log.args?.success;
  //       console.log("Answer was correct:", success);

  //       if (success !== undefined) {
  //         setIsAnswerRight(Boolean(success));
  //         setShowResult(true);
  //         setIsWaitingForEvent(false);
  //       }
  //     });
  //   },
  //   onError(error) {
  //     console.error("Event watcher error:", error);
  //     setIsWaitingForEvent(false);
  //   },
  // });

  // Wait for transaction receipt

  const { data: receipt, isSuccess: isReceiptSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  // Process receipt when available (fallback for events)
  useEffect(() => {
    if (isReceiptSuccess && receipt && isWaitingForEvent && address && txHash) {
      console.log("Transaction receipt received:", receipt);

      // Parse logs from receipt
      if (receipt.logs && receipt.logs.length > 0) {
        let eventFound = false;

        receipt.logs.forEach((log) => {
          try {
            // Check if log is from our contract
            if (
              log.address?.toLowerCase() === quizGame.address?.toLowerCase()
            ) {
              console.log("Log from our contract:", log);

              if (log.topics && log.topics.length >= 2) {
                // Extract player address from topics[1] (remove 0x and padding)
                const playerTopic = log.topics[1];
                const playerAddress = "0x" + playerTopic?.slice(-40); // Last 40 chars = address

                console.log("👤 Extracted player address:", playerAddress);
                console.log("👤 Current user address:", address);

                // Check if addresses match
                if (playerAddress?.toLowerCase() === address?.toLowerCase()) {
                  console.log("✅ Event is for current user!");

                  // Parse success from data field
                  // For boolean, 0x0000...0000 = false, anything else = true
                  const success =
                    log.data &&
                    log.data !==
                      "0x0000000000000000000000000000000000000000000000000000000000000000";

                  console.log("🎯 Parsed success:", success);

                  setIsAnswerRight(Boolean(success));
                  setShowResult(true);
                  setIsWaitingForEvent(false);
                  setTxHash(null);
                  eventFound = true;

                  console.log("✅ Quiz result updated successfully!");
                }
              }
            }
          } catch (parseError) {
            console.error("Error parsing log:", parseError);
          }
        });

        // If no relevant events found, still show result
        if (!eventFound) {
          setTimeout(() => {
            console.log("No events found in receipt, showing result anyway");
            setShowResult(true);
            setIsWaitingForEvent(false);
            setTxHash(null);
          }, 2000);
        }
      } else {
        // No logs in receipt, show result anyway
        setTimeout(() => {
          console.log("No logs in receipt, showing result anyway");
          setShowResult(true);
          setIsWaitingForEvent(false);
          setTxHash(null);
        }, 2000);
      }
    }
  }, [
    isReceiptSuccess,
    receipt,
    isWaitingForEvent,
    quizGame.address,
    address,
    txHash,
  ]);

  const handleSubmitAns = async () => {
    if (selectedAns === null) return;

    try {
      setIsWaitingForEvent(true);
      const result = await writeContractAsync({
        abi: quizGame.abi,
        address: quizGame.address,
        functionName: "checkAnswer",
        args: [selectedAns],
      });

      console.log("Transaction result:", result);
      setTxHash(result as `0x${string}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsWaitingForEvent(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading ? (
        <Loader className="animate-spin text-indigo-200" size={28} />
      ) : (
        data && (
          <Quiz
            data={data}
            selectedAns={selectedAns}
            setSelectedAns={setSelectedAns}
          />
        )
      )}

      <div className="w-full mt-4 flex justify-center">
        <QuizSubmitBtn
          handleSubmitAns={handleSubmitAns}
          selectedAns={selectedAns}
          isPending={isPending}
        />
      </div>

      {showResult && (
        <QuizResult
          isAnswerRight={isAnswerRight}
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
};

export default QuizBoard;
