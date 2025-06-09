import { useForm } from "react-hook-form";
import { Calendar, Clock, Star } from "lucide-react";
import { useCreateQuizMutation } from "../../../Store/ApiStore/Api";
import FormInputCrud from "../../Shared/FormInput/FormInputCrud";
import { getValidationRules } from "../../../hook/usevalidations";
import { toast } from "react-toastify";
interface CreateQuizProps {
  isOpen: () => boolean;
  group: GroupOption[];
  onSuccess: (quizData: { code: string }) => void;
  id: string | null;
}
const CreateQuiz = ({ isOpen, group, onSuccess, id }: CreateQuizProps) => {
  const [createQuiz, { isLoading: isCreate }] = useCreateQuizMutation();
  const {
    TitleQuiz,
    Description,
    type,
    Duration,
    ScoreperQuestion,
    Schedule,
    NameGroup,
    difficulty,
    QuestionNumber,
  } = getValidationRules();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      group: "",
      questions_number: 1,
      difficulty: "",
      type: "",
      schadule: "",
      duration: "30",
      score_per_question: "5",
    },
  });
  const handleCreateQuiz = async (quizData) => {
    try {
      const response = await createQuiz(quizData).unwrap();
      if (onSuccess) {
        onSuccess(response.data);
      }
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data.message || "Ckeck Your internet");
    } finally {
      reset();
    }
  };
  if (!isOpen) return null;
  return (
    <form
      id="modal-form"
      onSubmit={handleSubmit(handleCreateQuiz)}
      className="space-y-4 p-6"
    >
      {isCreate ? (
        <div className="flex items-center justify-center">
          <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
          <h1 className="text-lg font-medium text-gray-600">Creating Quiz</h1>
        </div>
      ) : (
        <>
          <FormInputCrud
            label="Quiz Title *"
            type="text"
            register={register}
            name="title"
            rules={TitleQuiz}
            error={errors.title}
          />
          <FormInputCrud
            label="Description *"
            type="text"
            register={register}
            name="description"
            rules={Description}
            error={errors.description}
          />
          <FormInputCrud
            label="Group Name *"
            name="group"
            register={register}
            type="select"
            rules={NameGroup}
            placeholderoption="Select Group Name"
            options={group}
            error={errors?.group}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <FormInputCrud
              label="Questions Number*"
              name="questions_number"
              register={register}
              type="number"
              rules={QuestionNumber}
              error={errors?.questions_number}
            />
            <FormInputCrud
              label={
                <span className="flex items-center">
                  <Star size={16} className="mr-1" />
                  Difficulty
                </span>
              }
              name="difficulty"
              register={register}
              placeholderoption="Select difficulty"
              type="select"
              rules={difficulty}
              options={["easy", "medium", "hard"]}
              error={errors?.difficulty}
            />
          </div>
          <FormInputCrud
            label="Quiz Type"
            name="type"
            register={register}
            rules={type}
            placeholderoption="Select category"
            type="select"
            options={["FE", "BE", "DO"]}
            error={errors?.type}
          />
          <FormInputCrud
            label={
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Schedule *
              </span>
            }
            name="schadule"
            register={register}
            type="datetime-local"
            rules={Schedule}
            error={errors?.schadule}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInputCrud
              label={
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  Duration (min) *
                </span>
              }
              name="duration"
              register={register}
              type="number"
              rules={Duration}
              error={errors?.duration}
            />
            <FormInputCrud
              label="Score per Question *"
              name="score_per_question"
              register={register}
              type="number"
              rules={ScoreperQuestion}
              error={errors?.score_per_question}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default CreateQuiz;
