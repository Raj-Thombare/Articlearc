import { BlogCard } from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import { formatTimestamp } from "../lib";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
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
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
