import { ChevronDown, Info } from "lucide-react";
import { UseFormRegister, RegisterOptions, FieldError } from "react-hook-form";
interface Option {
  value: string;
  name: string;
}

interface FormInputCrudProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  rules: RegisterOptions;
  options?: (string | Option)[];
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholderoption?: string;
  placeholder?: string;
  error?: string | FieldError | undefined;
}
const FormInputCrud = ({
  label,
  type = "text",
  register,
  name,
  rules,
  options = [],
  className = "",
  labelClassName = "",
  inputClassName = "",
  placeholderoption = "Select an option",
  error,
}: FormInputCrudProps) => {
  const isSelect = type === "select";
  const renderOptions = () => {
    return options.map((option, index) => {
      if (
        typeof option === "object" &&
        option !== null &&
        "value" in option &&
        "name" in option
      ) {
        return (
          <option
            key={option.value || index}
            value={option.value}
            className="bg-white py-2 text-gray-900"
          >
            {option.name}
          </option>
        );
      } else {
        return (
          <option
            key={option || index}
            value={option}
            className="bg-white py-2 text-gray-900"
          >
            {option}
          </option>
        );
      }
    });
  };
  return (
    <div className={`group mb-6 ${className}`}>
      <label
        className={`mb-2 block text-base font-semibold text-gray-700 ${labelClassName}`}
      >
        {label}
      </label>
      <div className={`relative ${name === "description" ? "" : "h-12"}`}>
        {isSelect ? (
          <select
            className={`w-full border-2 bg-white px-4 py-3 ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-600 focus:ring-gray-200"
            } appearance-none rounded-lg text-base text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-4 ${inputClassName} `}
            {...register(name, rules)}
          >
            <option value="" className="text-gray-500">
              {placeholderoption}
            </option>
            {renderOptions()}
          </select>
        ) : (
          <input
            type={type}
            className={`w-full border-2 bg-white px-4 py-3 ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-600 focus:ring-gray-200"
            } rounded-lg text-base text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-4 ${
              name === "description" ? "h-24 resize-none" : ""
            } ${inputClassName} `}
            {...register(name, rules)}
          />
        )}
        {isSelect && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 flex items-center text-sm text-red-500">
          <Info className="mr-1 h-4 w-4 flex-shrink-0" />
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
  );
};

export default FormInputCrud;
