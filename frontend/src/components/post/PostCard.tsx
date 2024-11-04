import { Link } from "react-router-dom";
import { PostCardType } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import {
  AddBookmarkIcon,
  BookmarkedIcon,
  DeleteIcon,
  EditIcon,
} from "../../assets/icons";

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
    coverImage,
    tags,
  }: PostCardType) => {
    const { authUser } = useAuthStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { createBookmark, removeBookmark, user } = useUserStore();
    const { deletePost, fetchUserPosts } = usePostStore();

    const [isSaved, setIsSaved] = useState(false);

    const { showToast } = useToast();

    const setBookmarks = useCallback(() => {
      setIsSaved(!!bookmarks?.find((bookmark) => bookmark.postId === id));
    }, [id, bookmarks]);

    useEffect(() => {
      setBookmarks();
    }, []);

    const addToBookmark = async () => {
      if (!authUser?.id) {
        showToast("You need to be signed in to save this post", "error");
        return;
      }
      try {
        createBookmark(authUser?.id, id);
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
        removeBookmark(authUser?.id, id);
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

    const redirectToEditor = () => {
      navigate(`/post/edit/${id}`, {
        state: { postDetails: { title, content, coverImage, tags } },
      });
    };

    const stripHtml = (html: any) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    };

    const shortDescription = stripHtml(content).substring(0, 110);

    const getShortDescription = (description: string, maxLength: number) => {
      if (description.length <= maxLength) return description;
      return `${description.substring(0, maxLength)}...`;
    };

    return (
      <div className='p-4 border-b border-slate-200 mx-auto max-w-[680px] break-words overflow-hidden'>
        <div className='flex mb-1'>
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
        <Link to={`/post/${id}`} className='flex w-full'>
          <div className='flex flex-col flex-1'>
            <div className='text-xl md:text-2xl font-black py-2 tracking-tight'>
              {title}
            </div>
            <div className='text-base font-medium text-text tracking-tight max-h-12 overflow-hidden'>
              {getShortDescription(shortDescription, 110) + "..."}
            </div>
            {/* desktop */}
            <div className='hidden md:flex justify-between items-center pt-4'>
              <div className=' text-[13px] font-normal text-text bg-background rounded-full px-3 py-1 min-w-[100px]'>
                {`${Math.ceil(content.length / 100)} min read`}
              </div>
              <div className='flex justify-end items-center w-28 md:w-32 space-x-5 md:space-x-10'>
                {pathname.startsWith("/profile") &&
                  !pathname.endsWith("/saved") &&
                  isOwner && (
                    <>
                      <button
                        className='opacity-70 hover:opacity-100'
                        onClick={(event) => {
                          event.preventDefault();
                          redirectToEditor();
                        }}>
                        <EditIcon />
                      </button>
                      <button
                        className='opacity-70 hover:opacity-100 ml-1'
                        onClick={(event) => {
                          event.preventDefault();
                          deletePostHandler();
                        }}>
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                {!pathname.startsWith("/profile") ||
                pathname.endsWith("/saved") ? (
                  <button
                    className='cursor-pointer hover:opacity-70'
                    onClick={(event) => {
                      event.preventDefault();
                      if (isSaved) {
                        removeFromBookmark();
                      } else {
                        addToBookmark();
                      }
                    }}>
                    {isSaved ? <BookmarkedIcon /> : <AddBookmarkIcon />}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className='flex items-start justify-end py-2'>
            {coverImage && (
              <img
                src={coverImage}
                alt='Cover Image'
                className='cover-image w-[140px] sm:w-[160px] h-20 ml-[26px] sm:ml-[56px]'
              />
            )}
          </div>
        </Link>
        <div className='flex md:hidden justify-between items-center pt-4'>
          <div className=' text-[13px] font-normal text-text bg-background rounded-full px-3 py-1 '>
            {`${Math.ceil(content.length / 100)} min read`}
          </div>
          <div className='flex justify-end items-center w-28 md:w-32 space-x-5 md:space-x-10'>
            {pathname.startsWith("/profile") &&
              !pathname.endsWith("/saved") &&
              isOwner && (
                <>
                  <button
                    className='opacity-70 hover:opacity-100'
                    onClick={(event) => {
                      event.preventDefault();
                      redirectToEditor();
                    }}>
                    <EditIcon />
                  </button>
                  <button
                    className='opacity-70 hover:opacity-100'
                    onClick={(event) => {
                      event.preventDefault();
                      deletePostHandler();
                    }}>
                    <DeleteIcon />
                  </button>
                </>
              )}
            {!pathname.startsWith("/profile") ? (
              <button
                className='cursor-pointer hover:opacity-70'
                onClick={(event) => {
                  event.preventDefault();
                  if (isSaved) {
                    removeFromBookmark();
                  } else {
                    addToBookmark();
                  }
                }}>
                {isSaved ? <BookmarkedIcon /> : <AddBookmarkIcon />}
              </button>
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
