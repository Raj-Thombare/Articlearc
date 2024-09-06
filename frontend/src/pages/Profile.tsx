import { useEffect } from "react";
import { formatTimestamp } from "../lib";
import { BlogCard } from "../components/blog/BlogCard";
import Skeleton from "../components/loader/Skeleton";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Avatar from "../components/ui/Avatar";
import Aside from "../components/global/Aside";
import Button from "../components/ui/Button";

const Profile = () => {
  const { id } = useParams();
  const { user, fetchUser, isLoading, posts, bookmarks } = useUserStore();

  useEffect(() => {
    if (id) fetchUser(id);
  }, [id, fetchUser]);

  return (
    <div className='flex flex-col md:flex-row md:justify-evenly min-h-screen'>
      <div className='flex-1 max-w-[728px]'>
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
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold text-center mb-4'>
            Profile Details
          </h1>
          <div className='flex flex-col items-center'>
            <Avatar
              name={user?.name!}
              size='w-20 h-20'
              font='bold'
              styles='text-3xl'
            />
            <div className='mt-6 text-base font-semibold w-full'>
              <p className='font-semibold'>
                Username:
                <span className='font-normal ml-2'>
                  @{user?.email.replace(/@(gmail\.com|test\.com)$/, "")}
                </span>
              </p>
              <p className='font-semibold'>
                Name:
                <span className='font-normal ml-2'>{user?.name}</span>
              </p>
              <p className='font-semibold'>
                Email:
                <span className='font-normal ml-2'>{user?.email}</span>
              </p>
              <div className='flex justify-between mt-4 space-x-2'>
                <div>
                  Articles: <span className='font-normal'>{posts.length}</span>
                </div>
                <div>
                  Reads: <span className='font-normal'>1022</span>
                </div>
              </div>
              <Button
                label='Edit Profile'
                style='bg-gray-200 rounded-sm mt-6'
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </Aside>
    </div>
  );
};

export default Profile;
