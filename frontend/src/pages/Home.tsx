import { PostCard } from "../components/post/PostCard";
import PostSkeleton from "../components/loader/PostSkeleton";
import { usePostStore } from "../store/postStore";
import UsersToFollow from "../components/user/UsersToFollow";
import RecommendedTopics from "../components/search/RecommendedTopics ";
import { useEffect } from "react";
import Aside from "../components/global/Aside";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";
import { formatTimestamp } from "../utils";
import { AddBookmarkIcon } from "../assets/icons";
import TagSkeleton from "../components/loader/TagSkeleton";
import UserCardSkeleton from "../components/loader/UserCardSkeleton";

const Home = () => {
  const { posts, isLoading, fetchAllPosts } = usePostStore();
  const { fetchBookmarks, bookmarks } = useUserStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!posts) {
      fetchAllPosts();
    }
  }, [posts]);

  useEffect(() => {
    if (!bookmarks && authUser?.id) {
      fetchBookmarks(authUser?.id);
    }
  }, [authUser]);

  return (
    <div className='flex flex-col md:flex-row md:justify-evenly md:min-h-[calc(74vh-70px)]'>
      <main className='flex-1 max-w-[728px] md:py-12'>
        <div className='px-4'>
          {isLoading
            ? [...Array(5)].map((_, index) => <PostSkeleton key={index} />)
            : posts?.map((post) => {
                const formatedDate = formatTimestamp(post.createdAt);
                return (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    authorName={post.author.name}
                    authorId={post.authorId}
                    title={post.title}
                    coverImage={post.coverImage}
                    content={post.content}
                    publishedDate={formatedDate}
                    bookmarks={bookmarks}
                  />
                );
              })}
        </div>
      </main>
      <Aside>
        {!isLoading ? <RecommendedTopics /> : <TagSkeleton />}
        {!isLoading ? <UsersToFollow /> : <UserCardSkeleton />}
        {!isLoading ? (
          <div className='mt-8 px-4 md:px-0'>
            <h3 className='font-bold pb-2 text-base'>Reading list</h3>
            <p className='text-text text-sm'>
              Click the
              <span className='inline-block mx-2'>
                <AddBookmarkIcon />
              </span>
              on any story to easily add it to your reading list or a custom
              list that you can share.
            </p>
          </div>
        ) : (
          <div className='h-40 w-full mt-10 bg-gray-200 rounded' />
        )}
      </Aside>
    </div>
  );
};

export default Home;
