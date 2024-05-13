import Layout from "./Layout";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { formatTimestamp } from "../lib";

const FullBlog = ({ blog }: { blog: Blog }) => {
  const formatedDate = formatTimestamp(blog.createdAt);
  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='grid grid-cols-12 gap-x-8 px-10 w-full pt-200 max-w-screen-xl pt-12 break-words'>
          <div className='col-span-8'>
            <div className='text-4xl font-extrabold'>{blog.title}</div>
            <div className='text-slate-500 pt-2'>Posted on {formatedDate}</div>
            <div className='pt-4 text-xl text-slate-800'>{blog.content}</div>
          </div>
          <div className='col-span-4'>
            <div className='text-slate-600 text-lg mb-2'>Author</div>
            <div className='flex w-full'>
              <div className='pr-4 flex flex-col justify-center'>
                <Avatar size='big' name={blog.author.name} />
              </div>
              <div>
                <div className='text-xl font-bold'>{blog.author.name}</div>
                <div className='pt-1 text-slate-700'>
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FullBlog;
