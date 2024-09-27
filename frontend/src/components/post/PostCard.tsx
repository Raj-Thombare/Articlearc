import { Link } from "react-router-dom";
import { PostCardType } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import { DeleteIcon } from "../../assets/delete";
import { EditIcon } from "../../assets/edit";
import { AddBookmarkIcon, BookmarkedIcon } from "../../assets/bookmark";

export const PostCard = memo(
  ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    authorId,
    bookmarks,
    isOwner,
  }: PostCardType) => {
    const { authUser } = useAuthStore();
    const { pathname } = useLocation();

    const { createBookmark, removeBookmark, user } = useUserStore();
    const { deletePost, fetchUserPosts } = usePostStore();
    const [isSaved, setIsSaved] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
      setIsSaved(!!bookmarks?.find((bookmark) => bookmark.postId === id));
    }, [id, bookmarks]);

    const addToBookmark = async () => {
      if (!authUser?.id) {
        showToast("You need to be signed in to save this post", "error");
        return;
      }

      try {
        await createBookmark(authUser.id, id);
        setIsSaved(true);
        showToast("Post Saved", "success");
      } catch (error) {
        showToast("Failed to save post", "error");
      }
    };

    const removeFromBookmark = async () => {
      if (!authUser?.id) {
        showToast("You need to be signed in to remove post", "error");
        return;
      }

      try {
        await removeBookmark(authUser?.id!, id);
        setIsSaved(false);
        showToast("Post Removed", "success");
      } catch (error) {
        showToast("Failed to remove post", "error");
      }
    };

    const deletePostHandler = async () => {
      try {
        await deletePost(id);
        if (user) fetchUserPosts(user?.id);
        showToast("Post deleted", "success");
      } catch (error) {
        showToast("Failed to delete post", "error");
      }
    };

    return (
      <div className='p-4 border-b border-slate-200 pb-4 mx-auto max-w-[680px] break-words'>
        <div className='flex'>
          <Link to={`/profile/${authorId}`}>
            <div className='flex items-center'>
              <Avatar name={authorName} styles='text-xs' size='w-6 h-6' />
              <div className='pl-2 font-medium text-sm flex justify-center flex-col text-nowrap'>
                {authorName}
              </div>
            </div>
          </Link>
          <div className='flex justify-center flex-col pl-2'>
            <Circle />
          </div>
          <div className='pl-2 font-normal text-text text-sm flex justify-center flex-col'>
            {publishedDate}
          </div>
        </div>
        <Link to={`/post/${id}`}>
          <div className='text-xl md:text-2xl font-extrabold py-2 tracking-tight'>
            {title}
          </div>
          <div className='text-sm md:text-base font-medium text-text tracking-tight'>
            {content?.slice(0, 150) + "..."}
          </div>
        </Link>
        <div className='flex justify-between items-center pt-4 flex-wrap'>
          <div className=' text-[13px] font-normal text-text bg-background rounded-full px-3 py-1 '>
            {`${Math.ceil(content.length / 100)} min read`}
          </div>
          <div className='flex justify-end items-center w-28 md:w-32 space-x-5 md:space-x-10'>
            {pathname.startsWith("/profile") &&
              !pathname.endsWith("/saved") &&
              isOwner && (
                <>
                  <button className='opacity-70 hover:opacity-100'>
                    <EditIcon />
                  </button>
                  <button
                    className='opacity-70 hover:opacity-100'
                    onClick={deletePostHandler}>
                    <DeleteIcon />
                  </button>
                </>
              )}
            {pathname === "/" || pathname.endsWith("/saved") ? (
              <div
                className='cursor-pointer'
                onClick={isSaved ? removeFromBookmark : addToBookmark}>
                {isSaved ? (
                  <button className='opacity-100 hover:opacity-70'>
                    <BookmarkedIcon />
                  </button>
                ) : (
                  <button className='opacity-70 hover:opacity-100'>
                    <AddBookmarkIcon />
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

export function Circle() {
  return <div className='h-[3px] w-[3px] rounded-full bg-[#6B6B6B]'></div>;
}
