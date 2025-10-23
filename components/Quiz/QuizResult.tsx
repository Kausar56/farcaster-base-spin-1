import { CoinsIcon, Frown, Repeat, Share, Trophy, X } from "lucide-react";
import React from "react";
import { useFrame } from "../farcaster-provider";

type SpinResultProps = {
  isAnswerRight: boolean;
  setShowResult: (result: boolean) => void;
};

const QuizResult = ({ isAnswerRight, setShowResult }: SpinResultProps) => {
  const { actions } = useFrame();

  const handleGenerateCustomOGImage = () => {
    actions?.composeCast({
      text: `🎉 I just earned 0.1 MON playing the MonadJam Mini Game! 🚀  

    Think you can beat my score? Try it now 👇`,
      embeds: ["https://farcaster.xyz/miniapps/j34aMVBzWE9z/monadjam"],
    });

    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-violet-600/20 relative backdrop-blur-md rounded-3xl p-8 text-center max-w-md w-full transform">
        <span
          onClick={() => setShowResult(false)}
          className="absolute right-3 top-3 text-red-500 p-1"
        >
          <X size={24} />
        </span>

        {isAnswerRight ? (
          <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
        ) : (
          <Frown className="mx-auto mb-4 text-yellow-500" size={48} />
        )}
        <h2 className="text-3xl font-bold mb-4 text-white">
          {isAnswerRight ? (
            "Correct!"
          ) : (
            <span className="text-red-500">Wrong!</span>
          )}
        </h2>
        {isAnswerRight ? (
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <CoinsIcon /> +0.1 MON
            </span>
            <p className="text-indigo-200">Reward already sent!</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Repeat className="text-yellow-500" size={24} />
            <span className="text-xl font-bold text-indigo-200">
              Try again next time!
            </span>
          </div>
        )}

        <button
          onClick={handleGenerateCustomOGImage}
          className="px-6 flex mx-auto gap-2 items-center py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
        >
          <Share />
          Share Now
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
