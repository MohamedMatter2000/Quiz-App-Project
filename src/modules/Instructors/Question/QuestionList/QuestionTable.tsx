import ErrorLoading from "../../../Shared/ErrorLoading/ErrorLoading";
import NotFound from "../../../Shared/NotFound/NotFound";
import { Edit, Trash2, Eye } from "lucide-react";
import { Question } from "../../../../interfaces/Question";
interface QuestionGridProps {
  isError: boolean;
  isLoading: boolean;
  Questions: Question[];
  handleViewQuestion: (id: string) => void;
  handleEditQuestion: (id: string) => void;
  handleViewDelete: (id: string) => void;
}
export default function QuestionTable({
  isError,
  isLoading,
  Questions,
  handleViewQuestion,
  handleEditQuestion,
  handleViewDelete,
}: QuestionGridProps) {
  return (
    <div className="hidden lg:block">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <th scope="col" className="px-6 py-4 text-left font-semibold">
              Title
            </th>
            <th scope="col" className="px-6 py-4 text-left font-semibold">
              Description
            </th>
            <th scope="col" className="px-6 py-4 text-left font-semibold">
              Difficulty Level
            </th>
            <th scope="col" className="px-6 py-4 text-left font-semibold">
              Type
            </th>
            <th scope="col" className="px-6 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isError && (
            <tr>
              <td colSpan={5} className="py-12 text-center">
                <ErrorLoading message={"questions"} />
              </td>
            </tr>
          )}
          {isLoading && (
            <tr>
              <td colSpan={5} className="py-12 text-center">
                <div className="flex items-center justify-center">
                  <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
                  <h1 className="text-lg font-medium text-gray-600">
                    Loading...
                  </h1>
                </div>
              </td>
            </tr>
          )}
          {Questions && Questions.length === 0 && !isLoading && !isError && (
            <tr>
              <td colSpan={5} className="py-12 text-center">
                <NotFound message={"question"} />
              </td>
            </tr>
          )}
          {Questions &&
            Questions.map((ques, index) => (
              <tr
                key={ques._id}
                className={`transition-colors duration-200 hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate font-medium text-gray-900">
                    {ques.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-gray-700">
                    {ques.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      ques.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : ques.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : ques.difficulty === "hard"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ques.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {ques.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleViewQuestion(ques._id)}
                      className="group rounded-full p-2 transition-colors duration-200 hover:bg-blue-100"
                      title="View Question"
                    >
                      <Eye
                        size={20}
                        className="text-blue-600 group-hover:text-blue-700"
                      />
                    </button>
                    <button
                      onClick={() => handleEditQuestion(ques._id)}
                      className="group rounded-full p-2 transition-colors duration-200 hover:bg-yellow-100"
                      title="Edit Question"
                    >
                      <Edit
                        size={20}
                        className="text-yellow-600 group-hover:text-yellow-700"
                      />
                    </button>
                    <button
                      onClick={() => handleViewDelete(ques._id)}
                      className="group rounded-full p-2 transition-colors duration-200 hover:bg-red-100"
                      title="Delete Question"
                    >
                      <Trash2
                        size={20}
                        className="text-red-600 group-hover:text-red-700"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
