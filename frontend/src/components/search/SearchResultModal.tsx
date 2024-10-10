import { Link } from "react-router-dom";
import { Post, User } from "../../lib/types";
import Avatar from "../ui/Avatar";
import { PostIcon } from "../../assets/icons";

interface Props {
  posts: Post[];
  users: User[];
  resultsRef: React.RefObject<HTMLDivElement>;
}

const SearchResultModal = ({ posts, users, resultsRef }: Props) => {
  return (
    <div
      ref={resultsRef}
      className='bg-white hidden md:block border shadow-lg w-[315px] absolute top-[114px] right-[136px] md:top-[52px] md:right-[135px] z-50 py-2 px-4 overflow-hidden'>
      <div className='p-1'>
        <div>
          {posts.length !== 0 && (
            <div className='my-2'>
              <div className='text-base font-semibold border-b border-gray-300 pb-2'>
                Articles
              </div>
              <div>
                {posts.map((post: Post) => {
                  return (
                    <div key={post.id} className='text-base pt-1'>
                      <Link
                        to={`/post/${post.id}`}
                        className='flex items-start justify-start py-2'>
                        <div className='p-1 mr-2'>
                          <PostIcon />
                        </div>
                        <div> {post?.title}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className='mt-2'>
          {users.length !== 0 && (
            <div>
              <div className='font-semibold border-b border-gray-300 pb-2 text-base'>
                People
              </div>
              <div className='my-2'>
                {users.map((user: User) => {
                  return (
                    <div key={user.id} className='text-base pt-1'>
                      <Link
                        to={`/profile/${user.id}`}
                        className='flex items-center'>
                        <Avatar
                          name={user?.name || ""}
                          size='w-8 h-8'
                          font='bold'
                          styles='text-base'
                        />
                        <div className='ms-3'>{user?.name}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
