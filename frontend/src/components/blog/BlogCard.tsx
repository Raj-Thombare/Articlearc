import { Link } from "react-router-dom";
import { BlogCardProps } from "../../lib/types";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import Avatar from "../ui/Avatar";
import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/toast";
import { memo, useEffect, useState } from "react";

export const BlogCard = memo(
  ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    authorId,
  }: BlogCardProps) => {
    const { user } = useAuthStore();
    const { createBookmark, fetchBookmarks, bookmarks, removeBookmark } =
      useUserStore();
    const [isSaved, setIsSaved] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
      if (user?.id) {
        const checkBookmark = async () => {
          if (!bookmarks) {
            await fetchBookmarks(user.id);
          }
          //@ts-ignore
          setIsSaved(!!bookmarks?.[id]);
        };

        checkBookmark();
      }
    }, [bookmarks, fetchBookmarks, id, user?.id]);

    const toggleBookmark = async () => {
      if (!isSaved) {
        await createBookmark(user?.id!, id);
        showToast("Post Saved", "success");
      } else {
        await removeBookmark(user?.id!, id);
        showToast("Bookmark Removed", "success");
      }
      setIsSaved(!isSaved);
    };

    return (
      <div>
        <div className='p-4 border-b border-slate-200 pb-4 max-w-[680px] break-words'>
          <div className='flex'>
            <Link to={`/profile/${authorId}`}>
              <div className='flex items-center'>
                <Avatar name={authorName} styles='text-xs' size='w-6 h-6' />
                <div className='font-normal pl-2 text-sm flex justify-center flex-col'>
                  {authorName}
                </div>
              </div>
            </Link>
            <div className='flex justify-center flex-col pl-2'>
              <Circle />
            </div>
            <div className='pl-2 font-normal text-slate-500 text-sm flex justify-center flex-col'>
              {publishedDate}
            </div>
          </div>
          <Link to={`/blog/${id}`}>
            <div className='text-lg md:text-2xl font-bold py-2'>{title}</div>
            <div className='text-sm md:text-base font-normal'>
              {content.slice(0, 150) + "..."}
            </div>
          </Link>
          <div className='flex justify-between items-center pt-4'>
            <div className='text-slate-500 text-sm font-normal'>
              {`${Math.ceil(content.length / 100)} min read`}
            </div>
            <button onClick={toggleBookmark} className='cursor-pointer'>
              {!isSaved ? (
                <BsBookmarkPlus
                  className='opacity-70 hover:opacity-100'
                  size={20}
                />
              ) : (
                <BsBookmarkFill size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export function Circle() {
  return <div className='h-[3px] w-[3px] rounded-full bg-slate-500'></div>;
}


