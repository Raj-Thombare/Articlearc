import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BlogCard } from "../components/blog/BlogCard";
import { formatTimestamp } from "../utils";
import { useUserStore } from "../store/userStore";
import Spinner from "../components/loader/Spinner";

const Bookmark = () => {
  const { id } = useParams();
  const { bookmarks, fetchBookmarks, isLoading } = useUserStore();

  useEffect(() => {
    if (id) fetchBookmarks(id);
  }, [id, fetchBookmarks]);

  return (
    <div className='grid grid-cols-1 md:space-x-4 py-6 md:py-12'>
      <h4 className='text-xl mb-4 font-semibold text-center'>Saved Articles</h4>
      <div>
        {!isLoading && bookmarks ? (
          <div>
            {bookmarks.length > 0 ? (
              <div>
                {bookmarks?.map((bookmark) => {
                  const post = bookmark.post;
                  const formattedDate = formatTimestamp(post.createdAt);
                  return (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      authorName={post.author?.name}
                      authorId={post.authorId}
                      title={post.title}
                      content={post.content}
                      publishedDate={formattedDate}
                      bookmarks={bookmarks}
                    />
                  );
                })}
              </div>
            ) : (
              <div className='text-center'>No Saved Articles</div>
            )}
          </div>
        ) : (
          <div className='h-[70vh] flex justify-center items-center'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
