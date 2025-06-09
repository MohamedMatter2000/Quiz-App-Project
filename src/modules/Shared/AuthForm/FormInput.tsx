import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { KeyRound, Mail, CreditCard, Eye, EyeOff } from "lucide-react";
export const FormInput = ({
  name,
  label,
  type = "text",
  rules,
  placeholder,
  disabled = false,
}: {
  name: string;
  label: string;
  type?: string;
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
}) => {
  function getIcon() {
    switch (type) {
      case "email":
        return <Mail />;
      case "password":
        return <KeyRound />;
      case "text":
        return <CreditCard />;
    }
  }

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const effectiveType = type === "password" && showPassword ? "text" : type;
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="mb-3 block text-sm font-medium text-white"
      >
        {label}
      </label>
      <div className="flex items-center justify-start rounded-lg border border-white bg-black p-2.5">
        <span className="text-2xl text-white">{getIcon()}</span>
        {name === "role" ? (
          <select
            id={name}
            className="w-full border-0 bg-black text-white"
            {...register(name, rules)}
          >
            <option value="">Select Role</option>
            <option value="Instructor" className="bg-black text-white">
              Instructor
            </option>
            <option value="Student" className="bg-black text-white">
              Student
            </option>
          </select>
        ) : (
          <>
            <input
              id={name}
              type={effectiveType}
              placeholder={placeholder}
              className="flex-1 border-0 bg-transparent py-0 text-sm text-white outline-0 placeholder:text-gray-600"
              {...register(name, rules)}
              disabled={disabled}
            />
            {type === "password" && (
              <button
                className="text-2xl text-white"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            )}
          </>
        )}
      </div>
      {errors[name]?.message && (
        <span className="text-red-700">{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};
