import FormInputCrud from "../../../Shared/FormInput/FormInputCrud";
import { getValidationRules } from "../../../../hook/usevalidations";
import {
  useCreateQuestionMutation,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} from "../../../../Store/ApiStore/Api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { File, Settings } from "lucide-react";
import { QuestionFormData } from "../../../../interfaces/Question";
export default function QuestionData({
  onSuccess,
  id,
}: {
  onSuccess: () => void;
  id: string | null;
}) {
  const {
    OptionA,
    OptionB,
    OptionC,
    OptionD,
    RightAnswer,
    Title,
    Description,
    type,
    difficulty,
  } = getValidationRules();
  const isEditing = Boolean(id);
  const [createQuestion, { isLoading: isCreate }] = useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpate }] = useUpdateQuestionMutation();
  const { data: selectedQuestion, isLoading: isGet } = useGetQuestionByIdQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
      skip: !isEditing,
    }
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuestionFormData>({
    mode: "onChange",
  });
  useEffect(() => {
    if (selectedQuestion) {
      setValue("title", selectedQuestion?.title);
      setValue("description", selectedQuestion?.description);
      setValue("options.A", selectedQuestion?.options?.A);
      setValue("options.B", selectedQuestion?.options?.B);
      setValue("options.C", selectedQuestion?.options?.C);
      setValue("options.D", selectedQuestion?.options?.D);
      setValue("type", selectedQuestion?.type);
      setValue("answer", selectedQuestion?.answer);
      setValue("difficulty", selectedQuestion?.difficulty);
    }
  }, [selectedQuestion, setValue]);
  const onSubmit = async (data: QuestionFormData): Promise<void> => {
    try {
      if (isEditing) {
        const response = await updateQuestion({ id, data }).unwrap();
        toast.success(response.message);
      } else {
        const response = await createQuestion(data).unwrap();
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      reset();
      if (onSuccess) onSuccess();
    }
  };
  const options = [
    { key: "A", label: "Option A", rules: OptionA },
    { key: "B", label: "Option B", rules: OptionB },
    { key: "C", label: "Option C", rules: OptionC },
    { key: "D", label: "Option D", rules: OptionD },
  ];
  return (
    <div className="rounded-xl bg-white p-8 shadow-2xl">
      {isCreate || isUpate || isGet ? (
        <div className="flex items-center justify-center">
          <div className="mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-800"></div>
          <h1 className="text-lg font-medium text-gray-600">
            {isCreate
              ? "Creating Question"
              : isUpate
              ? "Updating Question"
              : isGet
              ? "Geting Question"
              : "Fetching"}
          </h1>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="mb-2 text-3xl font-bold text-gray-800">
              Question Details
            </h3>
            <p className="text-gray-600">
              Fill in the information below to {isEditing ? "edit" : "create"} a
              question
            </p>
          </div>
          <form
            id="modal-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1">
              <div>
                <FormInputCrud
                  type="text"
                  label="Question Title"
                  name="title"
                  register={register}
                  rules={Title}
                  placeholder="Enter the question title"
                  error={errors?.title}
                />
              </div>
              <div>
                <FormInputCrud
                  label="Description"
                  name="description"
                  register={register}
                  rules={Description}
                  type="textarea"
                  placeholder="Provide a detailed description of the question"
                  error={errors?.description}
                />
              </div>
            </div>
            <div>
              <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <File className="mr-2 h-5 w-5 text-blue-600" />
                Answer Options
              </h4>
              <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                {options.map(({ key, label, rules }) => (
                  <div key={key}>
                    <FormInputCrud
                      type="text"
                      label={label}
                      name={`options.${key}`}
                      register={register}
                      rules={rules}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      error={errors?.options?.[key]}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Settings className="mr-2 h-5 w-5 text-green-600" />
                Question Settings
              </h4>
              <div className="grid grid-cols-1 gap-6 max-md:gap-0 md:grid-cols-3">
                <div>
                  <FormInputCrud
                    label="Correct Answer"
                    name="answer"
                    register={register}
                    rules={RightAnswer}
                    type="select"
                    placeholderoption="Select correct answer"
                    options={["A", "B", "C", "D"]}
                    error={errors?.answer}
                  />
                </div>
                <div>
                  <FormInputCrud
                    label="Category Type"
                    name="type"
                    register={register}
                    rules={type}
                    placeholderoption="Select category"
                    type="select"
                    options={["FE", "BE", "DO"]}
                    error={errors?.type}
                  />
                </div>
                <div>
                  <FormInputCrud
                    label="Difficulty Level"
                    name="difficulty"
                    register={register}
                    rules={difficulty}
                    placeholderoption="Select difficulty"
                    type="select"
                    options={["easy", "medium", "hard"]}
                    error={errors?.difficulty}
                  />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
