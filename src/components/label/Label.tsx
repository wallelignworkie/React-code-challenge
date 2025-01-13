interface Props {
  name: string;
}
const Label = ({ name }: Props) => {
  return (
    <>
      <label className="text-gray-800 text-sm mb-2 block">{name}</label>
    </>
  );
};

export default Label;
