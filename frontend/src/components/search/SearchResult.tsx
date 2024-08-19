import { Link } from "react-router-dom";
import { Blog, User } from "../../lib/types";
import Avatar from "../ui/Avatar";

interface Props {
  posts: Blog[];
  users: User[];
  resultsRef: React.RefObject<HTMLDivElement>;
}

const SearchResult = ({ posts, users, resultsRef }: Props) => {
  return (
    <div
      ref={resultsRef}
      className='bg-white border shadow-lg w-[315px] absolute top-[114px] right-[136px] md:top-[52px] md:right-[135px] z-50 py-2 px-4'>
      {users.length > 0 || posts.length > 0 ? (
        <div className='px-1 py-4'>
          <div>
            {posts.length !== 0 && (
              <div>
                <div className='text-lg font-semibold border-b border-gray-300 mb-2'>
                  ARTICLES
                </div>
                <div>
                  {posts.map((post: Blog) => {
                    return (
                      <div key={post.id} className='text-base py-1'>
                        <Link
                          to={`/blog/${post.id}`}
                          className='flex items-center'>
                          {post?.title}
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
                <div className='font-semibold border-b border-gray-300 mb-2 text-lg'>
                  PEOPLE
                </div>
                <div>
                  {users.map((user: User) => {
                    return (
                      <div key={user.id} className='text-base py-1'>
                        <Link
                          to={`profile/${user.id}`}
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
      ) : (
        <div className=''>No result found</div>
      )}
    </div>
  );
};

export default SearchResult;