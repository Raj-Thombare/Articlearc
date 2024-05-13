import { BlogCard } from "../components/BlogCard";
import Layout from "../components/Layout";
import { useBlogs } from "../hooks";
import { formatTimestamp } from "../lib";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  return (
    <Layout>
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
    </Layout>
  );
};

export default Blogs;
