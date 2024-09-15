import { useEffect, useState } from "react";
import { formatTimestamp } from "../utils";
import Skeleton from "../components/loader/Skeleton";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Aside from "../components/global/Aside";
import ProfileSkeleton from "../components/loader/ProfileSkeleton";
import Tabs from "../components/tabs/Tabs";
import SettingsTab from "../components/tabs/SettingsTab";
import ProfileTab from "../components/tabs/ProfileTab";
import { useAuthStore } from "../store/authStore";
import { PostCard } from "../components/post/PostCard";
import { usePostStore } from "../store/postStore";

const Profile = () => {
  const { id } = useParams();
  const { user, fetchUser, isLoading, bookmarks } = useUserStore();
  const { fetchUserPosts, userPosts } = usePostStore();
  const { authUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (id) fetchUser(id);
    if (id) fetchUserPosts(id);
  }, [id, fetchUser, fetchUserPosts]);

  const isOwner = authUser?.id === user?.id;

  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-evenly md:min-h-[calc(74vh-70px)]'>
      <div className='flex-1 max-w-[728px] py-6 md:py-12 border-t md:border-0'>
        <div>
          {!isLoading ? (
            <div>
              <h4 className='text-xl mb-4 font-semibold text-center'>
                Published Articles
              </h4>
              {userPosts?.length > 0 ? (
                <div>
                  {userPosts?.map((post) => {
                    const formatedDate = formatTimestamp(post.createdAt);
                    return (
                      <PostCard
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
          <>
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isOwner={isOwner}
            />
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "settings" && isOwner && <SettingsTab />}
          </>
        ) : (
          <ProfileSkeleton />
        )}
      </Aside>
    </div>
  );
};

export default Profile;
