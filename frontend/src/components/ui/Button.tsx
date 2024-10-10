import React from "react";

interface Props {
  label: string;
  style?: string;
  size?: string;
  icon?: React.ReactNode;
  font?: string;
  onClick: () => void;
}

const Button = ({ label, onClick, size, icon, style, font }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`font-medium px-5 py-2 flex items-center transition-all text-nowrap duration-100 ${
        size ? "text-lg" : "text-sm"
      } ${style}`}>
      {icon ? <div className='mr-1'>{icon}</div> : ""}
      <p className={`mx-auto text-center ${font ? font : ""}`}>{label}</p>
    </button>
  );
};

export default React.memo(Button);
