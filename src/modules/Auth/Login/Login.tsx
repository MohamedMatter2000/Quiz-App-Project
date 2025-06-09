import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hook/usevalidations";
import { useLoginMutation } from "../../../Store/ApiStore/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { LoginData } from "../../../interfaces/authInterfaces";
const Login = () => {
  const { email, password } = getValidationRules();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data).unwrap();
      navigate("/dashboard");
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || "Ckeck Your internet");
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            label="Registered email address"
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            rules={password}
            placeholder="Type Your Password"
          />
          <div className="flex items-center justify-between text-white">
            <ButtonForm isSubmitting={methods.formState.isSubmitting}>
              Sign in
            </ButtonForm>
            <p>
              ForgetPassword?
              <span className="text-(--color-title) underline">
                <Link to="/forget-password">click here</Link>
              </span>
            </p>
          </div>
        </ReusableForm>
      </FormProvider>
    </>
  );
};

export default Login;
