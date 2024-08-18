import { AvatarProps } from "../../lib/types";

const Avatar = ({ name, size, font = "light", styles }: AvatarProps) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size}`}>
      <span
        className={`${styles} ${
          font === "light" ? "font-extralight" : "font-normal"
        } text-gray-600`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;
