import { Post, User } from "../../lib/types";
import { PostCard } from "../post/PostCard";
import { formatTimestamp } from "../../utils";
import { useUserStore } from "../../store/userStore";
import { useEffect } from "react";
import UserProfileCard from "../user/UserProfileCard";
import { useAuthStore } from "../../store/authStore";

interface Props {
  posts: Post[];
  users: User[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchResult = ({ activeTab, posts, users }: Props) => {
  const { user, bookmarks, fetchBookmarks } = useUserStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!bookmarks && authUser?.id) {
      fetchBookmarks(authUser?.id);
    }
  }, [user, bookmarks, fetchBookmarks]);

  return (
    <div className='py-2 px-4'>
      <div className='px-1 py-4'>
        {activeTab === "articles" && (
          <>
            {posts.length !== 0 ? (
              <div>
                {posts.map((post: Post) => {
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
                })}
              </div>
            ) : (
              <div className='text-lg p-4'>No results found</div>
            )}
          </>
        )}
        {activeTab === "people" && (
          <>
            {users.length !== 0 ? (
              <div className='py-2'>
                {users.map((user: User) => {
                  return (
                    <UserProfileCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      username={user.email}
                      about={user.about}
                    />
                  );
                })}
              </div>
            ) : (
              <div className='text-lg p-4'>No results found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
