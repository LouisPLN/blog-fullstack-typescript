import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>; 
  errors?: any;
}

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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors ? 'border-red-500' : ''
        }`}
      />
      {errors && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
    </div>
  );
};

export default FormInput;