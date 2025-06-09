import { Users, Calendar } from "lucide-react";
interface Quiz {
  title: string;
  schadule: string;
  participants: number;
  status: "open" | "closed";
}
export const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getStatusColor = (status: string): string => {
    return status
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {quiz.title || "Untitled Quiz"}
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">
                <span className="font-medium">Scheduled:</span>
                {formatDate(quiz.schadule)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>
                <span className="font-medium">Enrolled:</span>
                {quiz.participants || 0} student
                {quiz.participants !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
              quiz.status
            )}`}
            role="status"
            aria-label={`Quiz status: ${quiz.status ? "Open" : "Closed"}`}
          >
            <div
              className={`mr-1.5 h-2 w-2 rounded-full ${
                quiz.status ? "bg-green-400" : "bg-red-400"
              }`}
            />
            {quiz.status ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
};
