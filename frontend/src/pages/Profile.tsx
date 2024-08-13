import axios from "axios";
import Layout from "../components/global/Layout";
import { BACKEND } from "../config";
import { useEffect, useState } from "react";
import { Blog, User } from "../lib/types";
import { formatTimestamp } from "../lib";
import { BlogCard } from "../components/blog/BlogCard";
import Skeleton from "../components/loader/Skeleton";

const Profile = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user!);
    const userId = parsedUser.id;

    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND}/api/v1/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(data.user.posts);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className='grid grid-cols-1 lg:grid-cols-custom md:space-x-4'>
        <div className='pt-8 md:pt-12'>
          <h4 className='text-xl font-semibold text-center'>
            Published Articles
          </h4>
          <div>
            {!loading ? (
              <div>
                {posts.map((post) => {
                  const formatedDate = formatTimestamp(post.createdAt);
                  return (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      authorName={post.author.name}
                      title={post.title}
                      content={post.content}
                      publishedDate={formatedDate}
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
          </div>
        </div>
        <aside className='border-0 md:border-l border-slate-200 py-8 md:pt-12 order-first md:order-last'>
          <div className='flex flex-col px-8'>
            <h1 className='text-xl font-semibold text-cente'>
              User profile page
            </h1>
            <h3>Username: {user?.name}</h3>
            <h3>Email: {user?.email}</h3>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Profile;
