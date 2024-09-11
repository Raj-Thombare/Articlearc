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
    bookmarks,
  }: BlogCardProps) => {
    const { authUser } = useAuthStore();

    const { createBookmark, removeBookmark } = useUserStore();

    const [isSaved, setIsSaved] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
      setIsSaved(!!bookmarks?.find((bookmark) => bookmark.postId === id));
    }, [id, bookmarks]);

    const addToBookmark = async () => {
      if (!authUser?.id) {
        showToast("You need to be signed in to bookmark this post", "error");
        return;
      }

      try {
        await createBookmark(authUser.id, id);
        setIsSaved(true);
        showToast("Post Saved", "success");
      } catch (error) {
        showToast("Failed to save bookmark", "error");
      }
    };

    const removeFromBookmark = async () => {
      if (!authUser?.id) {
        showToast("You need to be signed in to remove bookmark", "error");
        return;
      }

      try {
        await removeBookmark(authUser?.id!, id);
        setIsSaved(false);
        showToast("Bookmark Removed", "success");
      } catch (error) {
        showToast("Failed to remove bookmark", "error");
      }
    };

    return (
      <div className='p-4 border-b border-slate-200 pb-4 mx-auto max-w-[680px] break-words'>
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
          <button
            className='cursor-pointer'
            onClick={isSaved ? removeFromBookmark : addToBookmark}>
            {isSaved ? (
              <BsBookmarkFill
                className='opacity-100 hover:opacity-70'
                size={20}
              />
            ) : (
              <BsBookmarkPlus
                className='opacity-70 hover:opacity-100'
                size={20}
              />
            )}
          </button>
        </div>
      </div>
    );
  }
);

export function Circle() {
  return <div className='h-[3px] w-[3px] rounded-full bg-slate-500'></div>;
}
