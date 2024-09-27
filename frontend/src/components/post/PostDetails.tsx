import { Post } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { formatTimestamp } from "../../utils";
import { Circle } from "./PostCard";
import { useState } from "react";
import DOMPurify from "dompurify";

const PostDetails = ({ post }: { post: Post }) => {
  const [following, setFollowing] = useState(false);

  const formatedDate = formatTimestamp(post.createdAt);
  const sanitizedContent = DOMPurify.sanitize(post.content);

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
                  <div className='mt-0 font-medium text-base text-left rtl:text-right ms-3'>
                    <div>{post.author.name}</div>
                  </div>
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
          <div className='pt-4 text-[18px] md:text-[20px] font-read leading-8 text-[#242424]'>
            {post.content}
          </div>
          <div
            className='pt-4 text-[18px] md:text-[20px] font-read leading-8 text-[#242424]'
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
