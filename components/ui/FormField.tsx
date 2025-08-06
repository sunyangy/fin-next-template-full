import React from "react";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export function FormField<T extends FieldValues = FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  className = "",
  register,
  errors,
}: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`
          mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          sm:text-sm
          ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
}