import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hook/usevalidations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useChangePasswordMutation } from "../../../Store/ApiStore/Api";
import { ChangeData } from "../../../interfaces/authInterfaces";
const ChangePassword = () => {
  const methods = useForm({
    defaultValues: {
      password: "",
      password_new: "",
    },
  });
  const navigate = useNavigate();
  const { password } = getValidationRules();
  const [changePassword] = useChangePasswordMutation();
  const onSubmit = async (data: ChangeData) => {
    try {
      const response = await changePassword(data).unwrap();
      navigate("/login");
      toast.success(response.message);
    } catch (error: unknown) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  return (
    <FormProvider {...methods}>
      <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="password"
          rules={password}
          placeholder={"Type Your old  Password"}
          type="password"
          label=" Old Password"
        />
        <FormInput
          name="password_new"
          rules={password}
          placeholder={"Type Your new Password"}
          type="password"
          label=" New Password"
        />
        <ButtonForm isSubmitting={methods.formState.isSubmitting}>
          Change
        </ButtonForm>
      </ReusableForm>
    </FormProvider>
  );
};

export default ChangePassword;
