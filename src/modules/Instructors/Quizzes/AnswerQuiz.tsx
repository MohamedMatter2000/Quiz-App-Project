import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSubmitQuizMutation } from "../../../Store/ApiStore/Api";
import PreLoader from "../../Shared/PreLoader/PreLoader";
export default function AnswerQuiz({ data, handleScore, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [submitQuiz, { isLoading: isLoadingSubmit }] = useSubmitQuizMutation();
  const onSubmit = async (formData) => {
    const submissionData = {
      answers: Object.entries(formData).map(([questionId, answer]) => ({
        question: questionId,
        answer,
      })),
    };
    try {
      const response = await submitQuiz({
        id: data._id,
        answers: submissionData,
      }).unwrap();
      toast.success(response.message);
      handleScore(response.data.score);
    } catch (error) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <PreLoader />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data?.questions?.map((question, index) => (
                <div
                  key={question._id || index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"
                >
                  <div className="mb-4">
                    <h2 className="mb-2 text-xl font-semibold text-gray-800">
                      Question {index + 1}
                    </h2>
                    <p className="text-lg text-gray-700">{question.title}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(question.options).map(([key, value]) => {
                      if (key === "_id") return null;
                      const isSelected = watch(question._id) === key;
                      return (
                        <label
                          key={key}
                          className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all duration-200 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <div className="relative mr-4 flex-shrink-0">
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              value={key}
                              {...register(question._id, { required: true })}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            {isSelected && (
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                              </div>
                            )}
                          </div>
                          <div className="text-left">
                            <span className="font-medium">{key}.</span>
                            <span className="ml-2">{value}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {errors[question._id] && (
                    <p className="mt-2 text-sm text-red-600">
                      Please select an answer for this question
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-lg bg-gray-700 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoadingSubmit ? "Submitting...." : "Submit Quiz"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
