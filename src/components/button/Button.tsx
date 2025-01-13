interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  type?: "button" | "submit" | "reset"; // Limit `type` to valid button types
}

const Button: React.FC<Props> = ({ buttonText, type = "button", ...props }) => {
  return (
    <button
      type={type}
      className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-EPrimary hover:bg-gray-800 focus:outline-none"
      {...props} // Spread additional props like onClick, disabled, etc.
    >
      {buttonText}
    </button>
  );
};

export default Button;
