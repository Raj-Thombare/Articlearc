interface Props {
  label: string;
  style?: string;
  onClick: () => void;
}

const Button = ({ label, onClick, style }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg px-5 py-2.5 ${
        style ? "text-base" : "text-sm"
      }`}>
      {label}
    </button>
  );
};

export default Button;
