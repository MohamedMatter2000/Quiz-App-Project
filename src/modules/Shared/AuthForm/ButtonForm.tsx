import { CheckCircle, Loader2 } from "lucide-react";
function ButtonForm({
  children,
  isSubmitting,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
}) {
  return (
    <button
      type="submit"
      className={`flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-[#F5F5F5] px-6 py-2 text-lg font-medium capitalize text-black hover:bg-gray-200`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Loading" : children}
      {isSubmitting && <Loader2 className="animate-spin" />}
      {!isSubmitting && <CheckCircle />}
    </button>
  );
}

export default ButtonForm;
