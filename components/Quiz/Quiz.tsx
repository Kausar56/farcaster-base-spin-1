import React, { useState } from "react";

type Question = {
  text: string;
  options: readonly [string, string, string, string]; // ৪টা option fix
  correctOption: number;
};

type QuizProps = {
  data: Question;
  setSelectedAns: (selectedAns: number) => void;
  selectedAns: number | null;
};

type OptionsProps = Pick<QuizProps, "setSelectedAns" | "selectedAns"> & {
  option: string;
  answer: number;
};

function Option({ option, answer, setSelectedAns, selectedAns }: OptionsProps) {
  return (
    <button
      onClick={() => setSelectedAns(answer)}
      className={`${
        answer === selectedAns && "border-2 border-indigo-500 bg-indigo-400"
      } backdrop-blur-md p-2 rounded-md cursor-pointer text-sm font-semibold duration-300`}
    >
      {option}
    </button>
  );
}

const Quiz = ({ data, setSelectedAns, selectedAns }: QuizProps) => {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-lg font-bold text-white/80">{data?.text}</h1>
      </div>
      <div className="bg-indigo-200/20 w-full text-indigo-500 backdrop-blur-md p-2 rounded-md flex flex-col gap-2">
        {data?.options.map((option, index) => (
          <Option
            key={index}
            option={option}
            setSelectedAns={setSelectedAns}
            selectedAns={selectedAns}
            answer={index}
          />
        ))}
      </div>
    </>
  );
};

export default Quiz;
