import Layout from "../components/global/Layout";
import { useEffect } from "react";
import { formatTimestamp } from "../lib";
import { BlogCard } from "../components/blog/BlogCard";
import Skeleton from "../components/loader/Skeleton";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Avatar from "../components/ui/Avatar";
import Spinner from "../components/loader/Spinner";

const Profile = () => {
  const { id } = useParams();
  const { user, fetchUser, isLoading, posts } = useUserStore();

  useEffect(() => {
    if (id) fetchUser(id);
  }, []);

  return (
    <Layout>
      <div className='grid grid-cols-1 lg:grid-cols-custom md:space-x-4'>
        <div className='mt-8 md:mt-12'>
          <h4 className='text-xl mb-4 font-semibold text-center'>
            Published Articles
          </h4>
          <div>
            {!isLoading ? (
              <div>
                {posts.length !== 0 ? (
                  <div>
                    {posts.map((post) => {
                      const formatedDate = formatTimestamp(post.createdAt);
                      return (
                        <BlogCard
                          key={post.id}
                          id={post.id}
                          authorName={post.author.name}
                          authorId={post.authorId}
                          title={post.title}
                          content={post.content}
                          publishedDate={formatedDate}
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
        {!isLoading && user ? (
          <aside className='border-0 md:border-l border-slate-200 py-8 md:pt-12 order-first md:order-last'>
            <div className='flex flex-col px-8'>
              <h1 className='text-xl font-semibold text-center mb-4'>
                User profile page
              </h1>
              <div className='flex flex-col items-center'>
                <Avatar
                  name={"Test"}
                  size='w-20 h-20'
                  font='bold'
                  styles='text-3xl'
                />
                <div className='mt-4 text-lg'>
                  <p className='font-semibold'>
                    Name:
                    <span className='font-normal ml-2'>{user?.name}</span>
                  </p>
                  <p className='font-semibold'>
                    Email:
                    <span className='font-normal ml-2'>{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        ) : (
          <Spinner />
        )}
      </div>
    </Layout>
  );
};

export default Profile;
