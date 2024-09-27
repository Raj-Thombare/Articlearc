import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import UserProfileCard from "./UserProfileCard";
import { useAuthStore } from "../../store/authStore";
import UsersSkeleton from "../loader/UsersSkeleton";
import { Link } from "react-router-dom";

const UsersToFollow = ({ isLoading }: { isLoading: boolean }) => {
  const { fetchAllUsers, users } = useUserStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!users) {
      fetchAllUsers();
    }
  }, [users]);

  const filteredUsers = users?.filter((u) => u.id !== authUser?.id);
  return (
    <>
      {!isLoading ? (
        <div className='mt-8 px-4 md:px-0'>
          <h3 className='font-bold mb-4 text-base'>People to follow</h3>
          <div className='flex flex-col gap-1 flex-wrap flex-shrink mb-4'>
            {filteredUsers?.slice(0, 5).map((user) => {
              return (
                <UserProfileCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  username={user.email}
                />
              );
            })}
          </div>
          <Link to='/' className='text-green-600 hover:text-green-700 text-sm'>
            See more suggestions
          </Link>
        </div>
      ) : (
        <UsersSkeleton />
      )}
    </>
  );
};

export default UsersToFollow;
