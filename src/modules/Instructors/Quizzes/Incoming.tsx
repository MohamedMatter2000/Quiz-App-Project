/* eslint-disable react/prop-types */
import { Trash2, Eye } from "lucide-react";
export default function Incoming({ quizzes, handleDelete, handleView }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "hard":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden rounded-lg border border-gray-700 lg:block">
        <table className="w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Schedule
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {quizzes?.map((quiz) => (
              <tr
                key={quiz._id}
                className="transition duration-150 ease-in-out hover:bg-gray-700"
              >
                <td className="px-4 py-4 text-sm font-medium text-white">
                  <div className="max-w-xs truncate">{quiz.title}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  <div className="max-w-xs truncate">{quiz.description}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">{quiz.code}</td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  <span className="inline-flex rounded-full bg-green-600 px-2 py-1 text-xs font-semibold leading-5 text-white">
                    {quiz?.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 text-white ${getDifficultyColor(quiz.difficulty)}`}
                  >
                    {quiz.difficulty}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {formatDate(quiz.schadule || quiz.schedule)}
                </td>
                <td className="px-4 py-4 text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleView(quiz._id)}
                      className="text-blue-400 transition duration-150 ease-in-out hover:text-blue-500"
                      title="View Quiz"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz._id)}
                      className="text-red-400 transition duration-150 ease-in-out hover:text-red-500"
                      title="Delete Quiz"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile/Tablet Card View */}
      <div className="space-y-4 lg:hidden">
        {quizzes?.map((quiz) => (
          <div
            key={quiz._id}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 transition duration-150 ease-in-out hover:bg-gray-700"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="truncate pr-2 text-lg font-semibold text-white">
                {quiz.title}
              </h3>
              <div className="flex flex-shrink-0 items-center space-x-2">
                <button
                  onClick={() => handleView(quiz._id)}
                  className="text-blue-400 transition duration-150 ease-in-out hover:text-blue-500"
                  title="View Quiz"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleDelete(quiz._id)}
                  className="text-red-400 transition duration-150 ease-in-out hover:text-red-500"
                  title="Delete Quiz"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mb-3 text-sm text-gray-300">{quiz.description}</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Code:</span>
                <span className="ml-1 text-white">{quiz.code}</span>
              </div>
              <div>
                <span className="text-gray-400">Schedule:</span>
                <span className="ml-1 text-white">
                  {formatDate(quiz.schadule || quiz.schedule)}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-gray-600 pt-3">
              <span className="inline-flex rounded-full bg-green-600 px-2 py-1 text-xs font-semibold leading-5 text-white">
                {quiz.status}
              </span>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 text-white ${getDifficultyColor(quiz.difficulty)}`}
              >
                {quiz.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
