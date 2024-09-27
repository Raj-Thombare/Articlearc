import { ChangeEvent } from "react";

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
}: LabelledInputTypes) => {
  return (
    <div className='mt-4'>
      <label
        htmlFor={label}
        className='block mb-2 text-sm font-bold text-black'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={label}
        onChange={onChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-0'
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default LabelledInput;
