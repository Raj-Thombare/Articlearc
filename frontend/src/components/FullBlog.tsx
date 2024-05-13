import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { formatTimestamp } from "../lib";
import { Circle } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  const formatedDate = formatTimestamp(blog.createdAt);
  return (
    <div className='flex justify-center'>
      <div className='w-screen max-w-screen-md pt-12 px-5 break-words'>
        <div>
          <div className='text-4xl font-extrabold pb-2'>{blog.title}</div>
          <div className='flex flex-col justify-between md:items-center md:flex-row'>
            <figcaption className='flex items-center my-4'>
              <Avatar
                name='Raj'
                size='w-12 h-12'
                font='bold'
                styles='text-xl'
              />
              <div className='space-y-0.5 mt-0 font-medium text-left rtl:text-right ms-3'>
                <div>Raj Thombare</div>
                <div className='text-gray-500'>Developer at Open AI</div>
              </div>
            </figcaption>
            <div className='flex flex-col md:flex-row md:items-center'>
              <div className='text-slate-500'>Posted on {formatedDate}</div>
              <div className='hidden md:flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='text-slate-500 ml-0 md:ml-2'>
                {`${Math.ceil(blog.content.length / 100)} min read`}
              </div>
            </div>
          </div>
          <div className='pt-4 text-xl text-slate-800'>{blog.content}</div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
