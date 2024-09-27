import { useLocation, useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import { PostCard, Circle } from "../components/post/PostCard";
import { useEffect } from "react";
import { formatTimestamp, unslugify } from "../utils";
import Button from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import Carousel from "../components/ui/Carousel";

const Explore = () => {
  const { tag } = useParams();
  const { pathname } = useLocation();
  const { fetchAllPosts, posts } = usePostStore();
  const { bookmarks } = useUserStore();

  useEffect(() => {
    if (!posts) {
      fetchAllPosts();
    }
  }, [fetchAllPosts, posts]);

  const filteredposts = posts?.filter((post) => post.category.includes(tag!));
  const allTags = posts?.flatMap((post) => post.category);

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
              <div className='pl-2 font-medium text-text text-base flex justify-center flex-col'>
                Topic
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-medium text-text text-base flex justify-center flex-col'>
                {(Math.random() * (10 - 1) + 1).toFixed(1)}M Followers
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-medium text-text text-base flex justify-center flex-col'>
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
            {filteredposts?.map((post) => {
              const formatedDate = formatTimestamp(post.createdAt);
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  publishedDate={formatedDate}
                  authorId={post.authorId}
                  authorName={post.author.name}
                  bookmarks={bookmarks}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
