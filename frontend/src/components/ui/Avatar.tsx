import { AvatarProps } from "../../lib/types";

const Avatar = ({
  name = "test",
  size,
  font = "light",
  styles,
}: AvatarProps) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-background rounded-full ${size}`}>
      <span
        className={`${styles} ${
          font === "light" ? "font-normal" : "font-medium"
        } text-gray-600`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;
