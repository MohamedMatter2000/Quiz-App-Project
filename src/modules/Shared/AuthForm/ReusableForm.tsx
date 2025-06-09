import { useFormContext } from "react-hook-form";
const ReusableForm = ({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children: React.ReactNode;
}) => {
  const { handleSubmit } = useFormContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {children}
    </form>
  );
};

export default ReusableForm;
