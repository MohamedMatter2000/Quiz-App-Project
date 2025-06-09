import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hook/usevalidations";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../../Store/ApiStore/Api";
import { Link, useNavigate } from "react-router";
import { ForgetPassData } from "../../../interfaces/authInterfaces";
const ForgotPassword = () => {
  const { email } = getValidationRules();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: ForgetPassData) => {
    try {
      const response = await forgotPassword(data).unwrap();
      navigate("/reset-password", { state: data?.email });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            label="Email address"
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <div className="flex items-center justify-between text-white">
            <ButtonForm isSubmitting={methods.formState.isSubmitting}>
              Send email
            </ButtonForm>
            <p>
              Login?
              <span className="text-(--color-title) underline">
                <Link to="/login">click here</Link>
              </span>
            </p>
          </div>
        </ReusableForm>
      </FormProvider>
    </>
  );
};

export default ForgotPassword;
