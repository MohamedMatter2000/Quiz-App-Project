/* eslint-disable react/prop-types */
import { Clock, Award, Calendar, BookOpen } from "lucide-react";
export default function ViewQuiz({ Quiz }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="relative rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="mb-4 flex items-center gap-3">
          <BookOpen size={32} />
          <div>
            <h1 className="text-2xl font-bold">{Quiz?.title}</h1>
            <p className="text-blue-100">Quiz Code: {Quiz?.code}</p>
          </div>
        </div>
        <p className="text-blue-100">{Quiz?.description}</p>
      </div>

      {/* Quiz Info Cards */}
      <div className="p-6">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-800">
                  {Quiz?.duration} minutes
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-4">
            <div className="flex items-center gap-3">
              <Award className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Score</p>
                <p className="font-semibold text-gray-800">
                  {Quiz?.questions_number * Quiz?.score_per_question}
                  points
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-orange-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Questions</p>
                <p className="font-semibold text-gray-800">
                  {Quiz?.questions_number}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Status and Difficulty Badges */}
        <div className="mb-6 flex gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(
              Quiz?.status
            )}`}
          >
            {Quiz?.status.charAt(0).toUpperCase() + Quiz?.status.slice(1)}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${getDifficultyColor(
              Quiz?.difficulty
            )}`}
          >
            {Quiz?.difficulty.charAt(0).toUpperCase() +
              Quiz?.difficulty.slice(1)}
          </span>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
            {Quiz?.type}
          </span>
        </div>

        {/* Schedule */}
        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
            <Calendar size={20} />
            Scheduled Date & Time
          </h3>
          <p className="text-gray-600">{formatDate(Quiz?.schadule)}</p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <h3 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-800">
            Questions ({Quiz?.questions_number})
          </h3>

          {Quiz?.questions.map((question, index) => (
            <div
              key={question._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="mb-4 text-lg font-semibold text-gray-800">
                    {question.title}
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(question.options)
                      .filter(([key]) => key !== "_id")
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                        >
                          <span className="w-6 font-medium text-blue-600">
                            {key}.
                          </span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">
                  Points: {Quiz?.score_per_question}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
