import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className='p-4 border-b border-slate-200 pb-4 cursor-pointer w-screen max-w-screen-md break-words'>
        <div className='flex'>
          <div className='flex items-baseline'>
            <Avatar name={authorName} />
            <div className='font-normal pl-2 text-sm flex justify-center flex-col'>
              {authorName}
            </div>
          </div>
          <div className='flex justify-center flex-col pl-2'>
            <Circle />
          </div>
          <div className='pl-2 font-normal text-slate-500 text-sm flex justify-center flex-col'>
            {publishedDate}
          </div>
        </div>
        <div className='text-xl font-bold pt-1'>{title}</div>
        <div className='text-md font-normal'>
          {content.slice(0, 200) + "..."}
        </div>
        <div className='text-slate-500 text-sm font-normal pt-4'>
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className='h-[3px] w-[3px] rounded-full bg-slate-500'></div>;
}

export function Avatar({
  name,
  size = "small",
  font = "light",
}: {
  name: string;
  size?: "small" | "big";
  font?: "bold" | "light";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      }`}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-lg"} ${
          font === "light" ? "font-extralight" : "font-normal"
        } text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}
