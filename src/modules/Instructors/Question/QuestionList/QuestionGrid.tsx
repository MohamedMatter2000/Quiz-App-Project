import { Question } from "../../../../interfaces/Question";
import ErrorLoading from "../../../Shared/ErrorLoading/ErrorLoading";
import NotFound from "../../../Shared/NotFound/NotFound";
import { Edit, Trash2, Eye } from "lucide-react";
interface QuestionGridProps {
  isError: boolean;
  isLoading: boolean;
  Questions: Question[];
  handleViewQuestion: (id: string) => void;
  handleEditQuestion: (id: string) => void;
  handleViewDelete: (id: string) => void;
}
export default function QuestionGrid({
  isError,
  isLoading,
  Questions,
  handleViewQuestion,
  handleEditQuestion,
  handleViewDelete,
}: QuestionGridProps) {
  return (
    <div className="lg:hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Questions</h3>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
          <h1 className="text-lg font-medium text-gray-600">Loading...</h1>
        </div>
      )}
      {isError && (
        <div className="py-12 text-center">
          <ErrorLoading message={"questions"} />
        </div>
      )}
      {Questions && Questions.length === 0 && !isLoading && !isError && (
        <div className="py-12 text-center">
          <NotFound message={"question"} />
        </div>
      )}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {Questions &&
            Questions.map((ques) => (
              <div
                key={ques._id}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
              >
                <div className="p-6">
                  <h4 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                    {ques.title}
                  </h4>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {ques.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                        ques.difficulty === "easy"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : ques.difficulty === "medium"
                          ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                          : ques.difficulty === "hard"
                          ? "bg-red-50 text-red-700 ring-red-600/20"
                          : "bg-gray-50 text-gray-700 ring-gray-600/20"
                      }`}
                    >
                      {ques.difficulty}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                      {ques.type}
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 top-4 flex items-center space-x-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    onClick={() => handleViewQuestion(ques._id)}
                    className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50"
                    title="View Question"
                  >
                    <Eye size={20} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleEditQuestion(ques._id)}
                    className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-50"
                    title="Edit Question"
                  >
                    <Edit size={20} className="text-yellow-600" />
                  </button>
                  <button
                    onClick={() => handleViewDelete(ques._id)}
                    className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                    title="Delete Question"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
                <div
                  className={`h-1 ${
                    ques.difficulty === "easy"
                      ? "bg-gradient-to-r from-green-600 to-green-900"
                      : ques.difficulty === "medium"
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-900"
                      : ques.difficulty === "hard"
                      ? "bg-gradient-to-r from-red-600 to-red-900"
                      : "bg-gradient-to-r from-gray-400 to-gray-500"
                  }`}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
