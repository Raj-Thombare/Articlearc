import { Blog } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { formatTimestamp } from "../../lib";
import { Circle } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  const formatedDate = formatTimestamp(blog.createdAt);

  return (
    <div className='flex justify-center'>
      <div className='w-screen max-w-screen-md pt-12 px-5 break-words'>
        <div>
          <div className='text-2xl md:text-4xl font-bold pb-2'>
            {blog.title}
          </div>
          <div className='flex flex-col justify-between md:items-center md:flex-row'>
            <figcaption className='flex items-center my-4'>
              <Avatar
                name={blog.author.name}
                size='w-12 h-12'
                font='bold'
                styles='text-xl'
              />
              <div className='space-y-0.5 mt-0 font-medium text-left rtl:text-right ms-3'>
                <div>{blog.author.name}</div>
                <div className='text-gray-500'>
                  @{blog.author.email?.replace(/@(gmail\.com|test\.com)$/, "")}
                </div>
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
          <div className='pt-4 text-lg md:text-xl font-light leading-none'>
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
