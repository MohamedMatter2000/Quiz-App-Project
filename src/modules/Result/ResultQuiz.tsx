import { Quiz } from "../../interfaces/Quiz";
import { useGetAllQuizResultsQuery } from "../../Store/ApiStore/Api";
import ErrorLoading from "../Shared/ErrorLoading/ErrorLoading";
import NotFound from "../Shared/NotFound/NotFound";
interface QuizResult {
  quiz: Quiz;
}
export default function ResultQuiz() {
  const { data, isError, isLoading } = useGetAllQuizResultsQuery({});
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">All Result</h2>
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
                    <ErrorLoading message={"Result"} />
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
              {data?.quiz &&
                data.quiz.length === 0 &&
                !isLoading &&
                !isError && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <NotFound message={"Result"} />
                    </td>
                  </tr>
                )}
              {data &&
                data.map((ques: QuizResult, index: number) => (
                  <tr
                    key={ques?.quiz?._id}
                    className={`transition-colors duration-200 hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    {/* Quiz Title */}
                    <td className="px-3 py-4 lg:px-6">
                      <div className="max-w-[120px] truncate text-sm font-medium text-gray-900 sm:max-w-xs">
                        {ques?.quiz?.title}
                      </div>
                      {/* Mobile: Show description below title on small screens */}
                      <div className="mt-1 max-w-[120px] truncate text-xs text-gray-500 sm:hidden">
                        {ques?.quiz?.description || "N/A"}
                      </div>
                    </td>
                    {/* Description - Hidden on mobile */}
                    <td className="hidden px-3 py-4 sm:table-cell lg:px-6">
                      <div className="max-w-xs truncate text-sm text-gray-700">
                        {ques?.quiz?.description || "N/A"}
                      </div>
                    </td>
                    {/* Difficulty Level */}
                    <td className="px-3 py-4 lg:px-6">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          ques?.quiz?.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : ques?.quiz?.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : ques?.quiz?.difficulty === "hard"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ques?.quiz?.difficulty || "N/A"}
                      </span>
                      {/* Mobile: Show type below difficulty on small screens */}
                      <div className="mt-1 md:hidden">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          {ques?.quiz?.type || "N/A"}
                        </span>
                      </div>
                    </td>
                    {/* Type - Hidden on mobile and small tablets */}
                    <td className="hidden px-3 py-4 md:table-cell lg:px-6">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {ques?.quiz?.type || "N/A"}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-3 py-4 lg:px-6">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          ques?.quiz?.status === "open"
                            ? "bg-green-100 text-green-800"
                            : ques?.quiz?.status === "closed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {ques?.quiz?.status || "pending"}
                      </span>
                      {/* Mobile: Show duration and score below status */}
                      <div className="mt-1 space-y-1 lg:hidden">
                        <div className="text-xs text-gray-600">
                          {ques?.quiz?.duration
                            ? `${ques.quiz?.duration} min`
                            : "N/A"}
                        </div>
                        <div className="text-xs text-gray-600 xl:hidden">
                          {ques?.quiz?.score_per_question
                            ? `${ques?.quiz?.score_per_question} pts`
                            : "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Duration - Hidden on mobile and tablets */}
                    <td className="hidden px-3 py-4 lg:table-cell lg:px-6">
                      <div className="text-sm text-gray-700">
                        {ques?.quiz?.duration
                          ? `${ques.quiz?.duration} min`
                          : "N/A"}
                      </div>
                    </td>
                    {/* Score Per Question - Hidden on mobile, tablets, and desktop */}
                    <td className="hidden px-3 py-4 lg:px-6 xl:table-cell">
                      <div className="text-sm font-medium text-gray-900">
                        {ques?.quiz?.score_per_question
                          ? `${ques?.quiz?.score_per_question} pts`
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
