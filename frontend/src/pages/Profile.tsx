import { useEffect } from "react";
import { formatTimestamp } from "../utils";
import { BlogCard } from "../components/blog/BlogCard";
import Skeleton from "../components/loader/Skeleton";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Avatar from "../components/ui/Avatar";
import Aside from "../components/global/Aside";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import ProfileSkeleton from "../components/loader/ProfileSkeleton";

const Profile = () => {
  const { id } = useParams();
  const { user, fetchUser, isLoading, posts, bookmarks } = useUserStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (id) fetchUser(id);
  }, [id, fetchUser]);

  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-evenly md:min-h-[calc(74vh-70px)]'>
      <div className='flex-1 max-w-[728px] py-6 md:py-12'>
        <h4 className='text-xl mb-4 font-semibold text-center'>
          Published Articles
        </h4>
        <div>
          {!isLoading ? (
            <div>
              {posts.length > 0 ? (
                <div>
                  {posts.map((post) => {
                    const formatedDate = formatTimestamp(post.createdAt);
                    return (
                      <BlogCard
                        key={post.id}
                        id={post.id}
                        authorName={post.author.name}
                        authorId={post.author.id}
                        title={post.title}
                        content={post.content}
                        publishedDate={formatedDate}
                        bookmarks={bookmarks}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className='text-center'>No articles written yet!</div>
              )}
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
      </div>
      <Aside>
        {!isLoading ? (
          <div className='flex flex-col mb-10 md:mb-0 py-6 md:py-0'>
            <div className='flex flex-col items-center md:items-start'>
              <Avatar
                name={user?.name!}
                size='w-36 h-36 md:w-28 md:h-28'
                font='bold'
                styles='text-4xl md:text-3xl'
              />
              <div className='mt-6 text-base font-semibold w-full text-center md:text-left'>
                <p className='font-semibold text-xl'>{user?.name}</p>
                <p className='font-normal text-xl text-slate-500'>
                  @{user?.username}
                </p>
                <p className='font-normal text-lg'>
                  {Math.floor(Math.random() * 100)}k Followers
                </p>
                <div className='flex flex-row justify-center md:justify-start items-center w-full'>
                  <Button
                    label='Follow'
                    size='sm'
                    font='text-sm'
                    style='border border-black-600 text-white bg-black rounded-full px-4 py-2 hover:text-green-800 hover:bg-white mt-4 mr-4'
                    onClick={() => {}}
                  />
                  {authUser?.id === user?.id && (
                    <Button
                      label='Edit'
                      size='sm'
                      font='text-sm'
                      style='border border-slate-400 rounded-full px-4 py-2 text-slate-900 mt-4'
                      onClick={() => {}}
                    />
                  )}
                </div>
                <p className='text-base font-light text-slate-500 mt-3 p-4 md:p-0'>
                  Blogger & prof at CUNY’s Newmark J-school; author of Geeks
                  Bearing Gifts, Public Parts, What Would Google Do?, Gutenberg
                  the Geek
                </p>

                <div className='flex flex-row justify-center md:justify-start items-center w-full mt-2'>
                  <div className='flex flex-col items-center justify-center mr-6'>
                    <p>Posts</p>
                    <span className='font-normal mr-4'>{posts.length}</span>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <p> Reads</p>
                    <span className='font-normal'>
                      {Math.floor(Math.random() * 1000)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProfileSkeleton />
        )}
      </Aside>
    </div>
  );
};

export default Profile;
