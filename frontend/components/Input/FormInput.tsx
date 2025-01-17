import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: any;
}

const baseClasses = {
  label: "block font-medium text-gray-700 dark:text-gray-200 mb-1",
  input:
    "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-pink-600 dark:focus:ring-pink-700",
  errorInput: "border-red-500",
  errorText: "text-red-500 text-sm mt-2",
};

const FormInput = <T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  errors,
}: FormInputProps<T>) => {
  return (
    <div className="mb-4">
      <label className={baseClasses.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`${baseClasses.input} ${
          errors ? baseClasses.errorInput : ""
        }`}
      />
      {errors && <p className={baseClasses.errorText}>{errors.message}</p>}
    </div>
  );
};

export default FormInput;
