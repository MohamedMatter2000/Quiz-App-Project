import { useForm } from "react-hook-form";
export default function JoinQuiz({ closeModal, handleData }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    handleData(data);
    closeModal();
  };
  return (
    <form
      id="modal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Access Code Quiz
        </label>
        <input
          {...register("code", { required: "code is required" })}
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 transition-colors duration-200 hover:border-gray-400 focus:outline-none"
          placeholder="Enter your access code"
        />
      </div>
    </form>
  );
}
