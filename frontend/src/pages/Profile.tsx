import { useEffect, useState } from "react";
import { formatTimestamp, sortposts } from "../utils";
import PostSkeleton from "../components/loader/PostSkeleton";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import Aside from "../components/global/Aside";
import ProfileSkeleton from "../components/loader/ProfileSkeleton";
import ProfilePageTabs from "../components/tabs/ProfilePageTabs";
import SettingsTab from "../components/tabs/SettingsTab";
import ProfileTab from "../components/tabs/ProfileTab";
import { useAuthStore } from "../store/authStore";
import { PostCard } from "../components/post/PostCard";
import { usePostStore } from "../store/postStore";

const Profile = () => {
  const { id } = useParams();
  const { user, fetchUser, isLoading, bookmarks, fetchBookmarks } =
    useUserStore();
  const { fetchUserPosts, userPosts } = usePostStore();
  const { authUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (id) fetchUser(id);
    if (id) fetchUserPosts(id);
  }, [id, fetchUser, fetchUserPosts]);

  useEffect(() => {
    if (!bookmarks && id) {
      fetchBookmarks(id);
    }
  }, [id, bookmarks, fetchBookmarks]);

  const isOwner = authUser?.id === user?.id;

  let sortedposts;
  if (userPosts) {
    sortedposts = sortposts(userPosts);
  }

  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-evenly md:min-h-[calc(74vh-70px)]'>
      <div className='flex-1 max-w-[728px] py-6 md:py-12 border-t md:border-0'>
        <div>
          <div>
            {!isLoading && (
              <h4 className='text-xl mb-4 font-bold text-center'>
                Published Articles
              </h4>
            )}
            {isLoading ? (
              [...Array(3)].map((_, index) => <PostSkeleton key={index} />)
            ) : !isLoading && userPosts && userPosts.length === 0 ? (
              <div className='text-center py-4'>No articles written yet.</div>
            ) : (
              sortedposts?.map((post) => {
                const formattedDate = formatTimestamp(post.createdAt);
                return (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    coverImage={post.coverImage}
                    authorName={post.author.name}
                    authorId={post.author.id}
                    title={post.title}
                    content={post.content}
                    publishedDate={formattedDate}
                    bookmarks={bookmarks}
                    isOwner={isOwner}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Aside>
        {!isLoading ? (
          <>
            <ProfilePageTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isOwner={isOwner}
            />
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "settings" && isOwner && <SettingsTab />}
          </>
        ) : (
          <ProfileSkeleton isOwner={isOwner} />
        )}
      </Aside>
    </div>
  );
};


export default Profile;
