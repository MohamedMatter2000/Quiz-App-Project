import { useLocation, useNavigate } from "react-router";
import { getValidationRules } from "../../../hook/usevalidations";
import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../../Store/ApiStore/Api";
import { ResetData } from "../../../interfaces/authInterfaces";
const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm({
    defaultValues: {
      email: location?.state || "",
      password: "",
      otp: "",
    },
  });
  const { email, password } = getValidationRules();
  const onSubmit = async (data: ResetData) => {
    console.log(data);
    try {
      const response = await resetPassword(data).unwrap();
      navigate("/login", { state: data.email });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  return (
    <FormProvider {...methods}>
      <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          rules={email}
          label="Your email address"
          type="email"
          placeholder="Type Your Email"
          disabled
        />
        <FormInput
          name="otp"
          rules={{ required: "OTP is required" }}
          placeholder="Enter Your Otp"
          type="text"
          label="OTP"
        />
        <FormInput
          name="password"
          rules={password}
          placeholder={"Type Your Password"}
          type="password"
          label="Password"
        />

        <ButtonForm isSubmitting={methods.formState.isSubmitting}>
          Reset
        </ButtonForm>
      </ReusableForm>
    </FormProvider>
  );
};

export default ResetPassword;
