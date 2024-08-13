import { Link } from "react-router-dom";
import { AvatarProps, BlogCardProps } from "../../lib/types";

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className='p-4 border-b border-slate-200 pb-4 cursor-pointer max-w-[680px] break-words'>
        <div className='flex'>
          <div className='flex items-center'>
            <Avatar name={authorName} styles='text-xs' size='w-6 h-6' />
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
        <div className='text-2xl font-bold py-2'>{title}</div>
        <div className='text-md font-normal'>
          {content.slice(0, 150) + "..."}
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

export function Avatar({ name, size, font = "light", styles }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size}`}>
      <span
        className={`${styles} ${
          font === "light" ? "font-extralight" : "font-normal"
        } text-gray-600`}>
        {name[0]}
      </span>
    </div>
  );
}
