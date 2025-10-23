import { contractAbi } from "@/abi/abi";
import React, { useState } from "react";
import { useWriteContract } from "wagmi";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<
    readonly [string, string, string, string]
  >(["", "", "", ""]);
  const { writeContract, isPending } = useWriteContract();
  const [error, setError] = useState("");
  const [rightAnswer, setRightAnswer] = useState(0);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions as [string, string, string, string]);
  };

  const handleAddQuestion = () => {
    if (!question || options.some((opt) => opt.trim() === "")) {
      setError("Please fill in the question and all options.");
      return;
    }
    if (rightAnswer < 0 || rightAnswer > 3) {
      setError("Please select a valid right answer.");
      return;
    }
    if (
      options.length < 4 ||
      options.filter((opt) => opt.trim() !== "").length < 4
    ) {
      setError("Please provide at least 4 options.");
      return;
    }
    writeContract(
      {
        abi: contractAbi.quizGame.abi,
        address: contractAbi.quizGame.address,
        functionName: "addQuestion",
        args: [question, options, rightAnswer],
      },
      {
        onSuccess(data) {
          setQuestion("");
          setOptions(["", "", "", ""]);
          setRightAnswer(0);
        },
      }
    );
    setError("");
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div>
        <h1 className="text-white text-xl font-bold text-center">
          Add Question Component
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Enter question"
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
        />
        <select
          onChange={(e) => setRightAnswer(parseInt(e.target.value))}
          className="w-full bg-gray-800 text-sm text-white p-2 rounded mb-2"
        >
          <option value="" disabled selected>
            Select Right Answer
          </option>
          <option value={0}>Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>
        <input
          placeholder="Enter option 1"
          type="text"
          onChange={(e) => handleOptionChange(0, e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          value={options[0]}
        />
        <input
          placeholder="Enter option 2"
          type="text"
          onChange={(e) => handleOptionChange(1, e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          value={options[1]}
        />
        <input
          placeholder="Enter option 3"
          type="text"
          onChange={(e) => handleOptionChange(2, e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          value={options[2]}
        />
        <input
          placeholder="Enter option 4"
          type="text"
          onChange={(e) => handleOptionChange(3, e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          value={options[3]}
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        onClick={handleAddQuestion}
        className="py-2 px-3 bg-blue-500 rounded-md mt-2 text-white"
        disabled={isPending}
      >
        {isPending ? "Adding Question..." : "Add Question"}
      </button>
    </div>
  );
};

export default AddQuestion;
