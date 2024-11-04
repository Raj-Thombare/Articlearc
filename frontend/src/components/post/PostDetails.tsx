import { Post } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { formatTimestamp, unslugify } from "../../utils";
import { Circle } from "./PostCard";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useToast } from "../../hooks/useToast";
import { Link, useLocation } from "react-router-dom";
import PostActionButtons from "./PostActionButtons";

const PostDetails = ({ post }: { post: Post }) => {
  const [following, setFollowing] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();
  const formatedDate = formatTimestamp(post.createdAt);
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const postUrl = `${window.location.origin}${location.pathname}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        showToast("Post URL copied to clipboard!", "success");
      })
      .catch(() => {
        showToast("Failed to copy URL", "error");
      });
  };

  const tags: string[] = post.tags.map((tagObj) => tagObj?.name);
  return (
    <div className='flex justify-center'>
      <div className='w-screen max-w-screen-md py-12 px-5 break-words'>
        <div>
          <div className='text-[32px] md:text-[42px] leading-10 md:leading-12 font-[900] pb-2'>
            {post.title}
          </div>
          <div className='flex flex-col justify-between md:items-center md:flex-row flex-1'>
            <figcaption className='flex items-center my-4'>
              <Avatar
                name={post.author.name}
                size='w-12 h-12'
                font='bold'
                styles='text-xl'
              />
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <Link
                    to={`/profile/${post.author?.id}`}
                    className='mt-0 font-medium text-base text-left rtl:text-right ms-3 hover:underline'>
                    <div>{post.author.name}</div>
                  </Link>
                  <div className='flex justify-center flex-col pl-2'>
                    <Circle />
                  </div>
                  <button
                    onClick={() => setFollowing(!following)}
                    className={`${
                      following
                        ? "text-text"
                        : "text-blue hover:text-light-blue"
                    }   ml-2 font-semibold`}>
                    {following ? "Following" : "Follow"}
                  </button>
                </div>
                <div className='text-sm'>
                  <div className='flex flex-row flex-wrap md:items-center mt-0 font-semibold text-left text-sm rtl:text-right ms-3'>
                    <div className='text-text'>Posted on {formatedDate}</div>
                    <div className='flex justify-center flex-col pl-2 mr-2'>
                      <Circle />
                    </div>
                    <div className='text-text bg-background px-3 py-1 rounded-full font-normal'>
                      {`${Math.ceil(post.content.length / 100)} min read`}
                    </div>
                  </div>
                </div>
              </div>
            </figcaption>
          </div>
          <PostActionButtons handleCopyLink={handleCopyLink} />
          <div className='flex justify-center py-2'>
            {post?.coverImage && (
              <img
                src={post.coverImage}
                alt='Cover Image'
                className='w-auto h-auto rounded-sm'
              />
            )}
          </div>
          <div
            className='prose pt-4 text-[18px] md:text-[20px] font-read leading-8 text-[#242424]'
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <div className='flex flex-row flex-wrap items-start mt-14'>
            {tags.map((tag) => (
              <Link
                to={`/tag/${tag}`}
                key={tag}
                className='bg-background text-text px-4 py-2 rounded-md mr-2 mb-2'>
                {unslugify(tag![0].toUpperCase() + tag?.slice(1, tag.length))}
              </Link>
            ))}
          </div>
          <PostActionButtons handleCopyLink={handleCopyLink} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
