import { BlogCard } from "../components/blog/BlogCard";
import Skeleton from "../components/loader/Skeleton";
import { formatTimestamp, sortBlogs } from "../lib";
import { useBlogStore } from "../store/blogStore";
import { BsBookmarkPlus } from "react-icons/bs";
import UsersToFollow from "../components/user/UsersToFollow";
import RecommendedTopics from "../components/search/RecommendedTopics ";
import { useEffect } from "react";
import Aside from "../components/global/Aside";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { blogs, isLoading, fetchBlogs } = useBlogStore();
  const { fetchBookmarks, bookmarks } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!blogs) {
      fetchBlogs();
    }

    if (!bookmarks && user?.id) {
      fetchBookmarks(user?.id);
    }
  }, [blogs, bookmarks]);

  let sortedBlogs;
  if (blogs) {
    sortedBlogs = sortBlogs(blogs);
  }

  const allTags = blogs?.flatMap((blog) => blog.category);

  const tags = [...new Set(allTags)];

  return (
    <div className='flex flex-col md:flex-row md:justify-evenly min-h-screen'>
      <main className='flex-1 max-w-[728px]'>
        {!isLoading ? (
          <div className='px-4'>
            {sortedBlogs?.map((blog) => {
              const formatedDate = formatTimestamp(blog.createdAt);
              return (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name}
                  authorId={blog.authorId}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={formatedDate}
                  bookmarks={bookmarks}
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
      </main>
      <Aside>
        <RecommendedTopics isLoading={isLoading} tags={tags} />
        <UsersToFollow isLoading={isLoading} />
        <div className='mt-8 px-4 md:px-0'>
          <h3 className='font-semibold pb-2'>Reading list</h3>
          <p>
            Click the
            <span className='inline-block mx-2'>
              <BsBookmarkPlus size={20} />
            </span>
            on any story to easily add it to your reading list or a custom list
            that you can share.
          </p>
        </div>
      </Aside>
    </div>
  );
};

export default Home;
