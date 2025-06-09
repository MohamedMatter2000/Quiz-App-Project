import { Trophy, Star, ThumbsUp, Target, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ScoreQuiz = ({
  scoreperQuestion,
  score,
  totalQuestions,
  handlerest,
}: {
  scoreperQuestion: number | string;
  score: number | string;
  totalQuestions: number | string;
  handlerest: () => void;
}) => {
  const totalPossibleScore = Number(scoreperQuestion) * Number(totalQuestions);
  const percentage = parseFloat(
    ((Number(score) / totalPossibleScore) * 100).toFixed(2)
  );
  const navigate = useNavigate();
  const getScoreData = (percentage: number) => {
    if (percentage >= 90) {
      return {
        message: "Excellent! Outstanding Performance! ",
        description:
          "You've achieved an exceptional score. You've mastered the material perfectly!",
        icon: Trophy,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        progressColor: "bg-yellow-500",
      };
    } else if (percentage >= 80) {
      return {
        message: "Great Job! Very Good Performance! ",
        description: "Very good score. You're on the right track!",
        icon: Star,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        progressColor: "bg-green-500",
      };
    } else if (percentage >= 70) {
      return {
        message: "Good! Acceptable Performance",
        description:
          "Good performance, but it can be improved with a bit more review.",
        icon: ThumbsUp,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        progressColor: "bg-blue-500",
      };
    } else if (percentage >= 60) {
      return {
        message: "Fair, but Needs Improvement ",
        description:
          "Acceptable result, but we recommend reviewing the material more.",
        icon: Target,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        progressColor: "bg-orange-500",
      };
    } else {
      return {
        message: "Needs More Review ",
        description:
          "We recommend reviewing the material thoroughly and practicing more before the next attempt.",
        icon: BookOpen,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        progressColor: "bg-red-500",
      };
    }
  };
  const scoreData = getScoreData(percentage);
  const IconComponent = scoreData.icon;
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };
  const handleResetScore = () => {
    handlerest();
  };
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Quiz Results</h2>
        <div
          className={`${scoreData.bgColor} ${scoreData.borderColor} mb-4 rounded-lg border-2 p-6`}
        >
          <div className="mb-3 flex items-center justify-center">
            <IconComponent className={`h-12 w-12 ${scoreData.color}`} />
          </div>
          <div className="mb-2 text-4xl font-bold text-gray-800">
            {score}/{totalPossibleScore}
          </div>
          <div className="mb-3 text-2xl font-semibold text-gray-700">
            {percentage}%
          </div>
          <div className={`text-lg font-medium ${scoreData.color} mb-2`}>
            {scoreData.message}
          </div>
          <div className="text-sm text-gray-600">{scoreData.description}</div>
        </div>
        <div className="mb-6 h-4 w-full rounded-full bg-gray-200">
          <div
            className={`h-4 rounded-full ${scoreData.progressColor} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleGoToDashboard}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
        <button
          onClick={handleResetScore}
          className="flex-1 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          Join Another Quiz
        </button>
      </div>
    </div>
  );
};

export default ScoreQuiz;
