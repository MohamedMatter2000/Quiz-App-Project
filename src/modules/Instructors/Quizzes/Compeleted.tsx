import { Calendar, CheckCircle, Clock, Trophy, Users } from "lucide-react";
export default function Compeleted({ quiz }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-900 text-green-300";
      case "medium":
        return "bg-yellow-900 text-yellow-300";
      case "hard":
        return "bg-red-900 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-900 text-green-300 border-green-700";
      case "closed":
        return "bg-red-900 text-red-300 border-red-700";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-xl font-bold text-white">{quiz?.title}</h3>
          <p className="rounded bg-gray-700 px-2 py-1 font-mono text-sm text-gray-300">
            Code: {quiz?.code}
          </p>
        </div>
        <div
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(
            quiz?.status
          )}`}
        >
          <CheckCircle className="mr-1 inline h-3 w-3" />
          {quiz?.status?.toUpperCase()}
        </div>
      </div>
      {quiz?.description && (
        <p className="mb-4 text-sm text-gray-300">{quiz?.description}</p>
      )}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-300">
          <Clock className="mr-2 h-4 w-4 text-blue-400" />
          <span>{quiz?.duration} minutes</span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <Users className="mr-2 h-4 w-4 text-green-400" />
          <span>{quiz?.participants} participants</span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <Trophy className="mr-2 h-4 w-4 text-yellow-400" />
          <span>{quiz?.score_per_question} pts/question</span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-900 text-xs font-bold text-purple-400">
            Q
          </span>
          <span>{quiz?.questions_number} questions</span>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(
            quiz?.difficulty
          )}`}
        >
          {quiz?.difficulty?.toUpperCase() || "MEDIUM"}
        </span>
        <span className="text-xs text-gray-400">Type: {quiz?.type}</span>
      </div>
      <div className="space-y-2 border-t border-gray-700 pt-4">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="mr-2 h-3 w-3" />
          <span>Scheduled: {formatDate(quiz?.schadule)}</span>
        </div>
        {quiz?.closed_at && (
          <div className="flex items-center text-xs text-gray-400">
            <CheckCircle className="mr-2 h-3 w-3" />
            <span>Closed: {formatDate(quiz?.closed_at)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
