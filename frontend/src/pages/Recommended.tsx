import { useLocation, useParams } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { BlogCard, Circle } from "../components/blog/BlogCard";
import { useEffect } from "react";
import { formatTimestamp, unslugify } from "../utils";
import Button from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import Carousel from "../components/ui/Carousel";
import Skeleton from "../components/loader/Skeleton";

const Recommended = () => {
  const { tag } = useParams();
  const { pathname } = useLocation();
  const { fetchBlogs, blogs } = useBlogStore();
  const { bookmarks, isLoading } = useUserStore();

  useEffect(() => {
    if (!blogs) {
      fetchBlogs();
    }
  }, [fetchBlogs, blogs]);

  const filteredBlogs = blogs?.filter((blog) => blog.category.includes(tag!));
  const allTags = blogs?.flatMap((blog) => blog.category);

  const tags = [...new Set(allTags)];

  return (
    <div className='py-6 md:py-12'>
      <Carousel isActive={tag} tags={tags} path={pathname} />
      <div className='flex flex-col md:flex-row md:justify-evenly'>
        <div className='flex-1 max-w-full'>
          <div className='text-xl mb-4 text-center flex flex-col justify-center items-center pb-10 border-b'>
            <p className='font-bold text-2xl md:text-4xl mb-4'>
              {unslugify(tag![0].toUpperCase() + tag?.slice(1, tag.length))}
            </p>
            <div className='flex'>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                Topic
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                {(Math.random() * (10 - 1) + 1).toFixed(1)}M Followers
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-normal text-slate-500 text-base flex justify-center flex-col'>
                {Math.floor(Math.random() * 999)}k stories
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
            {!isLoading ? (
              <div className='px-4'>
                {filteredBlogs?.map((blog) => {
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
