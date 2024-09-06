import { Link, useLocation, useParams } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { BlogCard, Circle } from "../components/blog/BlogCard";
import { useEffect } from "react";
import { formatTimestamp } from "../lib";
import Button from "../components/ui/Button";
import RecommendedTopics from "../components/search/RecommendedTopics ";
import { useUserStore } from "../store/userStore";

const Recommended = () => {
  const { tag } = useParams();
  const { pathname } = useLocation();
  const { fetchBlogs, blogs } = useBlogStore();
  const { bookmarks } = useUserStore();

  useEffect(() => {
    if (blogs?.length === 0) {
      fetchBlogs();
    }
  }, [fetchBlogs, blogs]);

  const filteredBlogs = blogs?.filter((blog) => blog.category.includes(tag!));
  const allTags = blogs?.flatMap((blog) => blog.category);

  const tags = [...new Set(allTags)];

  return (
    <>
      <RecommendedTopics path={pathname} isActive={tag} tags={tags} />
      <div className='flex flex-col md:flex-row md:justify-evenly'>
        <div className='flex-1 max-w-full'>
          <div className='text-xl mb-4 text-center flex flex-col justify-center items-center pb-4 border-b'>
            <Link to={`/tag/${tag}`} className='font-bold text-4xl mb-4'>
              {tag![0].toUpperCase() + tag?.slice(1, tag.length)}
            </Link>
            <div className='flex'>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                Topic
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                8.1M Followers
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                421k stories
              </div>
            </div>
            <Button
              label='Follow'
              size='sm'
              font='text-sm'
              style='border border-gray-800 rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-white hover:text-black mt-4'
              onClick={() => {}}
            />
          </div>
          <div>
            {filteredBlogs?.map((blog) => {
              const formatedDate = formatTimestamp(blog.createdAt);
              return (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={formatedDate}
                  authorId={blog.authorId}
                  authorName={blog.author.name}
                  bookmarks={bookmarks}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommended;
