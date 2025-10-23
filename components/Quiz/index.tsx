import React from "react";
import QuizBoard from "./QuizBoard";
import QuizHeader from "./QuizHeader";

const Quiz = () => {
  return (
    <div className="px-4 mt-6 w-full flex flex-col gap-2">
      <QuizHeader />
      <QuizBoard />
    </div>
  );
};

export default Quiz;
