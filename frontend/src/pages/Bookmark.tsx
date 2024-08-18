import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/global/Layout";
import Skeleton from "../components/loader/Skeleton";
import { BlogCard } from "../components/blog/BlogCard";
import { formatTimestamp } from "../lib";
import { useUserStore } from "../store/userStore";

const Bookmark = () => {
  const { id } = useParams();

  const { bookmarks, fetchBookmarks, isLoading } = useUserStore();

  useEffect(() => {
    if (id) fetchBookmarks(id);
  }, [id, fetchBookmarks]);

  return (
    <Layout>
      <div className='grid grid-cols-1 lg:grid-cols-custom md:space-x-4'>
        <div className='mt-8 md:mt-12'>
          <h4 className='text-xl mb-4 font-semibold text-center'>
            Saved Articles
          </h4>
          <div>
            {!isLoading ? (
              <div>
                {bookmarks.length !== 0 ? (
                  <div>
                    {bookmarks.map((bookmark) => {
                      const post = bookmark.post;
                      const formatedDate = formatTimestamp(post.createdAt);
                      return (
                        <BlogCard
                          key={post.id}
                          id={post.id}
                          authorName={post.author?.name}
                          authorId={post.authorId}
                          title={post.title}
                          content={post.content}
                          publishedDate={formatedDate}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className='text-center'>No Saved Articles</div>
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
      </div>
    </Layout>
  );
};

export default Bookmark;
