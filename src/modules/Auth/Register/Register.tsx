import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { getValidationRules } from "../../../hook/usevalidations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../../Store/ApiStore/Api";
import { RegisterData } from "../../../interfaces/authInterfaces";

const Register = () => {
  const { email, password, userName } = getValidationRules();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
    },
  });
  const onSubmit = async (data: RegisterData) => {
    console.log(data);
    try {
      const response = await register(data).unwrap();
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };

  return (
    <FormProvider {...methods}>
      <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-6">
          <FormInput
            label="Your first name"
            name="first_name"
            rules={userName}
            placeholder="Type Your first name"
            type="text"
          />
          <FormInput
            label="Your last name"
            name="last_name"
            rules={userName}
            placeholder="Type Your last name"
            type="text"
          />
        </div>
        <FormInput
          label="Your email address"
          name="email"
          rules={email}
          placeholder="Type Your Email"
          type="email"
        />
        <FormInput
          label="Your Role"
          name="role"
          rules={{ required: "role is required" }}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          rules={password}
          placeholder={"Type Your Password"}
        />
        <ButtonForm isSubmitting={methods.formState.isSubmitting}>
          Sign up
        </ButtonForm>
      </ReusableForm>
    </FormProvider>
  );
};

export default Register;
