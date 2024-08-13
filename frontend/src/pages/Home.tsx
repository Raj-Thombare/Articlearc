import { BlogCard } from "../components/blog/BlogCard";
import Layout from "../components/global/Layout";
import Skeleton from "../components/loader/Skeleton";
import { useBlogs } from "../hooks/blog";
import { formatTimestamp } from "../lib";

const Home = () => {
  const { blogs, loading } = useBlogs();

  return (
    <Layout>
      <div className='grid grid-cols-1 lg:grid-cols-custom md:space-x-4'>
        <div className='flex justify-center pt-8 md:pt-12'>
          {!loading ? (
            <div>
              {blogs.map((blog) => {
                const formatedDate = formatTimestamp(blog.createdAt);
                return (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={formatedDate}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          )}
        </div>
        <aside className='border-0 md:border-l border-slate-200 py-8 md:pt-12'>
          <div className='px-8'>
            <div className='p-4'>
              <h3 className='font-semibold'>Recommended topics</h3>
              <p className='block mt-4'>Science</p>
              <p className='block mt-4'>Web3</p>
              <p className='block mt-4'>Technology</p>
              <p className='block mt-4'>Cryptocurrency</p>
              <p className='block mt-4'>History</p>
            </div>
            <div className='mt-8 p-4'>
              <h3 className='font-semibold'>Who to follow</h3>
              <p className='block mt-4'>Rohit Sharma</p>
              <p className='block mt-4'>harkirat Singh</p>
              <p className='block mt-4'>Ed Sheeran</p>
              <p className='block mt-4'>Micheal Collins</p>
              <p className='block mt-4'>Robert Downy</p>
            </div>
            <div className='mt-8 font-semibold'>
              Reading list Click the on any story to easily add it to your
              reading list or a custom list that you can share.
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Home;
