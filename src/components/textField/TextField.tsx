interface Props {
  placeholder: string;
  name: string;
  type: string;
}
const TextField = ({ placeholder, name, type }: Props) => {
  return (
    <>
      <input
        name={name}
        type={type}
        className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
        placeholder={placeholder}
      />
    </>
  );
};

export default TextField;
