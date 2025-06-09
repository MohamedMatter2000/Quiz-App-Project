type Question = {
  _id: string;
  title: string;
  description: string;
  options: string;
  answer: string;
  difficulty: string;
  points: number;
  type: string;
  status: string;
};

export default function QuizView({ Question }: { Question: Question }) {
  return (
    <div key={Question._id}>
      <div className="my-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="text-lg font-medium text-gray-800">Question</h3>
          <p className="mt-2 text-gray-700">
            Title : {Question.title || "No Question"}
          </p>
          <p className="mt-2 text-gray-700">
            Description : {Question.description || "No Question"}
          </p>
        </div>
      </div>
      <div className="px-4">
        <h3 className="text-lg font-medium text-gray-800">Options</h3>
        <div className="my-4 space-y-2">
          {Object.entries(Question.options || {}).map(([key, value]) => {
            if (key === "_id") return null;
            const isCorrect = Question.answer === key;
            return (
              <div
                key={key}
                className={`flex items-start rounded-lg p-3 ${
                  isCorrect
                    ? "border border-green-200 bg-green-50"
                    : "border border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                    isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {key}
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <p className="text-gray-700">{value}</p>
                  {isCorrect && (
                    <span className="mt-1 inline-block text-sm text-green-600">
                      Correct Answer
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="  grid grid-cols-4 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
            <p className="capitalize text-gray-800">
              {Question.difficulty || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Points</h3>
            <p className="text-gray-800">{Question.points || "0"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Type</h3>
            <p className="text-gray-800">{Question.type || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="capitalize text-gray-800">
              {Question.status || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
