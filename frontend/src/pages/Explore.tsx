import { useLocation, useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import { PostCard, Circle } from "../components/post/PostCard";
import { useEffect, useState } from "react";
import {
  formatTimestamp,
  getFollowersCount,
  getStoriesCount,
  unslugify,
} from "../utils";
import Button from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import Carousel from "../components/ui/Carousel";
import PostSkeleton from "../components/loader/PostSkeleton";

const Explore = () => {
  const { tag } = useParams();
  const { pathname } = useLocation();
  const { tags, fetchAllTags, fetchPostByTag, postsByTag, isLoading } =
    usePostStore();
  const { bookmarks } = useUserStore();
  const [storiesCount, setStoriesCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  const tagName = pathname.split("/tag/")[1];

  useEffect(() => {
    if (!tags) {
      fetchAllTags();
    }

    fetchPostByTag(tagName);

    const stories = getStoriesCount();
    const followers = getFollowersCount();

    if (stories && followers) {
      setStoriesCount(stories);
      setFollowersCount(followers);
    }
  }, [tagName]);

  const allTags = tags?.flatMap((tag: { name: string }) => tag.name);

  return (
    <div className='py-6 md:py-12'>
      <Carousel isActive={tagName} tags={allTags} path={pathname} />
      <div className='flex flex-col md:flex-row md:justify-evenly'>
        <div className='flex-1 max-w-full'>
          <div className='text-xl mb-4 text-center flex flex-col justify-center items-center pb-10 border-b'>
            <p className='font-extrabold text-3xl md:text-4xl mb-4'>
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
                {followersCount}M Followers
              </div>
              <div className='flex justify-center flex-col pl-2'>
                <Circle />
              </div>
              <div className='pl-2 font-medium text-text text-base flex justify-center flex-col'>
                {storiesCount}k Stories
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
            {isLoading && (!postsByTag || postsByTag.length === 0) ? (
              [...Array(2)].map((_, index) => <PostSkeleton key={index} />)
            ) : postsByTag && postsByTag.length > 0 ? (
              postsByTag.map((post) => {
                const formatedDate = formatTimestamp(post.createdAt);
                return (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    authorName={post.author?.name}
                    authorId={post.authorId}
                    title={post.title}
                    coverImage={post.coverImage}
                    content={post.content}
                    publishedDate={formatedDate}
                    bookmarks={bookmarks}
                  />
                );
              })
            ) : (
              <p className='text-center'>No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
