import { useGetAllQuizzesQuery } from "../../Store/ApiStore/Api";
import ErrorLoading from "../Shared/ErrorLoading/ErrorLoading";
import NotFound from "../Shared/NotFound/NotFound";

export default function AllQuizData() {
  const { data: quizData, isError, isLoading } = useGetAllQuizzesQuery({});
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">All Quizzes</h2>
      <div className="w-full overflow-x-auto">
        <div className="min-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-sm font-semibold lg:px-6"
                >
                  Quiz Title
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-4 text-left text-sm font-semibold sm:table-cell lg:px-6"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-sm font-semibold lg:px-6"
                >
                  Difficulty
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-4 text-left text-sm font-semibold md:table-cell lg:px-6"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-sm font-semibold lg:px-6"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-4 text-left text-sm font-semibold md:table-cell lg:px-6"
                >
                  Schedule
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-4 text-left text-sm font-semibold lg:table-cell lg:px-6"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-4 text-left text-sm font-semibold lg:px-6 xl:table-cell"
                >
                  Score/Q
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isError && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <ErrorLoading message={"All Quizzess"} />
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
                      <h1 className="text-lg font-medium text-gray-600">
                        Loading...
                      </h1>
                    </div>
                  </td>
                </tr>
              )}
              {quizData && quizData.length === 0 && !isLoading && !isError && (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <NotFound message={"All Quizzess"} />
                  </td>
                </tr>
              )}
              {quizData?.map((quiz, index) => (
                <tr
                  key={quiz._id}
                  className={`transition-colors duration-200 hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-3 py-4 lg:px-6">
                    <div className="max-w-[120px] truncate text-sm font-medium text-gray-900 sm:max-w-xs">
                      {quiz.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {quiz.code}
                    </div>
                    <div className="mt-1 max-w-[120px] truncate text-xs text-gray-500 sm:hidden">
                      {quiz.description || "N/A"}
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 sm:table-cell lg:px-6">
                    <div className="max-w-xs truncate text-sm text-gray-700">
                      {quiz.description || "N/A"}
                    </div>
                  </td>
                  <td className="px-3 py-4 lg:px-6">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        quiz.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : quiz.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : quiz.difficulty === "hard"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quiz.difficulty || "N/A"}
                    </span>
                    <div className="mt-1 md:hidden">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {quiz.type || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 md:table-cell lg:px-6">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {quiz.type || "N/A"}
                    </span>
                  </td>
                  <td className="px-3 py-4 lg:px-6">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        quiz.status === "open"
                          ? "bg-green-100 text-green-800"
                          : quiz.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {quiz.status || "pending"}
                    </span>
                    <div className="mt-1 space-y-1 lg:hidden">
                      <div className="text-xs text-gray-600 md:hidden">
                        {new Date(quiz.schadule).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-gray-600">
                        {quiz.duration ? `${quiz.duration} min` : "N/A"}
                      </div>
                      <div className="text-xs text-gray-600 xl:hidden">
                        {quiz.score_per_question
                          ? `${quiz.score_per_question} pts`
                          : "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 md:table-cell lg:px-6">
                    <div className="text-sm text-gray-700">
                      <div>
                        {new Date(quiz.schadule).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {new Date(quiz.schadule).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 lg:table-cell lg:px-6">
                    <div className="text-sm text-gray-700">
                      {quiz.duration ? `${quiz.duration} min` : "N/A"}
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 lg:px-6 xl:table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {quiz.score_per_question
                        ? `${quiz.score_per_question} pts`
                        : "N/A"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
