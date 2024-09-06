import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import UserProfileCard from "./UserProfileCard";
import { useAuthStore } from "../../store/authStore";
import UsersSkeleton from "../loader/UsersSkeleton";

const UsersToFollow = ({ isLoading }: { isLoading: boolean }) => {
  const { fetchAllUsers, users } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!users) {
      fetchAllUsers();
    }
  }, [users]);

  const filteredUsers = users?.filter((u) => u.id !== user?.id);
  return (
    <>
      {!isLoading ? (
        <div className='mt-8 px-4 md:px-0'>
          <h3 className='font-semibold mb-4'>People to follow</h3>
          <div className='flex flex-col gap-1 flex-wrap flex-shrink'>
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
        </div>
      ) : (
        <UsersSkeleton />
      )}
    </>
  );
};

export default UsersToFollow;
