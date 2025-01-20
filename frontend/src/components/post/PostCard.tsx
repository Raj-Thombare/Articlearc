import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { motion } from "framer-motion";
import { Post } from "../../lib/types";
import { useUserStore } from "../../store/userStore";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/postStore";
import {
  AddBookmarkIcon,
  BookmarkedIcon,
  CommentIcon,
  DeleteIcon,
  EditIcon,
  LikeIcon,
} from "../../assets/icons";
import { formatTimestamp } from "../../utils";

export const PostCard = memo(({ post }: { post: Post }) => {
  const {
    id,
    title,
    content,
    coverImage,
    createdAt,
    author,
    _count,
    // bookmarks,
    tags,
  } = post;

  const { authUser } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { createBookmark, removeBookmark, user, bookmarks } = useUserStore();
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

  const isOwner = post.id !== id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
      className='px-4 py-6 border-b border-slate-200 mx-auto max-w-[680px] break-words overflow-hidden'>
      <div className='flex mb-1'>
        <Link to={`/profile/${author?.id}`}>
          <div className='flex items-center'>
            <Avatar name={author?.name} styles='text-xs' size='w-6 h-6' />
            <div className='pl-2 font-medium text-sm flex justify-center flex-col text-nowrap'>
              {author?.name}
            </div>
          </div>
        </Link>
        <div className='flex justify-center flex-col pl-2'>
          <Circle />
        </div>
        <div className='pl-2 font-normal text-text text-sm flex justify-center flex-col'>
          {formatTimestamp(createdAt)}
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
          <div className='hidden md:flex justify-between items-center pt-6'>
            <div className=' text-[13px] font-normal text-text bg-background rounded-full px-3 py-1 min-w-[100px]'>
              {content && `${Math.ceil(content.length / 100)} min read`}
            </div>
            <div className='flex justify-end items-center space-x-4 md:space-x-8 px-2'>
              {/* Show Edit and Delete Options if it's the owner's profile */}
              {isOwner ? (
                pathname.startsWith("/profile") &&
                !pathname.endsWith("/saved") && (
                  <>
                    <button
                      className='text-text hover:opacity-70'
                      onClick={(event) => {
                        event.preventDefault();
                        redirectToEditor();
                      }}>
                      <EditIcon />
                    </button>
                    <button
                      className='text-text hover:opacity-70 ml-1'
                      onClick={(event) => {
                        event.preventDefault();
                        deletePostHandler();
                      }}>
                      <DeleteIcon />
                    </button>
                  </>
                )
              ) : (
                // Show Bookmark, Like, and Comment Options for other profiles
                <>
                  <button className='cursor-pointer text-text hover:opacity-70'>
                    <span className='flex items-center'>
                      <LikeIcon />
                      <span className='ml-1 text-sm font-medium text-text tracking-tight'>
                        {_count?.likes}
                      </span>
                    </span>
                  </button>
                  <button className='cursor-pointer text-text hover:opacity-70'>
                    <span className='flex items-center'>
                      <CommentIcon />
                      <span className='ml-1 text-sm font-medium text-text tracking-tight'>
                        6
                      </span>
                    </span>
                  </button>
                  <button
                    className={`cursor-pointer ${
                      !isSaved && "text-text"
                    } hover:opacity-70`}
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
                </>
              )}
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
      {/* mobile */}
      <div className='flex md:hidden justify-between items-center pt-4 flex-wrap'>
        <div className='text-[13px] font-normal text-text bg-background rounded-full px-3 py-1'>
          {content && `${Math.ceil(content.length / 100)} min read`}
        </div>
        <div className='flex justify-end items-center space-x-8 md:space-x-10'>
          {/* Show Edit and Delete Options if it's the owner's profile */}
          {isOwner ? (
            pathname.startsWith("/profile") &&
            !pathname.endsWith("/saved") && (
              <>
                <button
                  className='text-text hover:opacity-70'
                  onClick={(event) => {
                    event.preventDefault();
                    redirectToEditor();
                  }}>
                  <EditIcon />
                </button>
                <button
                  className='text-text hover:opacity-70'
                  onClick={(event) => {
                    event.preventDefault();
                    deletePostHandler();
                  }}>
                  <DeleteIcon />
                </button>
              </>
            )
          ) : (
            // Show Bookmark, Like, and Comment Options for other profiles
            <>
              <button className='cursor-pointer text-text hover:opacity-70'>
                <span className='flex items-center'>
                  <LikeIcon />
                  <span className='ml-1 text-sm font-medium text-text tracking-tight'>
                    12
                  </span>
                </span>
              </button>
              <button className='cursor-pointer text-text hover:opacity-70'>
                <span className='flex items-center'>
                  <CommentIcon />
                  <span className='ml-1 text-sm font-medium text-text tracking-tight'>
                    6
                  </span>
                </span>
              </button>
              <button
                className={`cursor-pointer ${
                  !isSaved && "text-text"
                } hover:opacity-70`}
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
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export const Circle = () => {
  return <div className='h-[3px] w-[3px] rounded-full bg-[#6B6B6B]'></div>;
};
