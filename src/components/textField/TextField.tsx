import React from "react";

interface Props {
  placeholder: string;
  name: string;
  type: string;
  register?: {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
  }; // React Hook Form's register method output
  className?: string; // Optional: additional CSS classes
  error?: string; // Optional: display error message
}

const TextField = ({
  placeholder,
  name,
  type,
  register,
  className,
  error,
}: Props) => {
  return (
    <div className="mb-4">
      <input
        {...(register || {})} // Pass register props if provided
        name={name} // Ensure `name` is included for controlled/standard forms
        type={type}
        className={`bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all ${
          className || ""
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}{" "}
      {/* Show error */}
    </div>
  );
};

export default TextField;
