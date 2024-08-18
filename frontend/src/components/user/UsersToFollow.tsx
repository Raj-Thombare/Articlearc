import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import UserProfileCard from "./UserProfileCard";
import { useAuthStore } from "../../store/authStore";

const UsersToFollow = () => {
  const { fetchAllUsers, users } = useUserStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const filteredUsers = users?.filter((u) => u.id !== user?.id);

  return (
    <div className='mt-8 px-4 md:px-0'>
      <h3 className='font-semibold mb-4'>People to follow</h3>
      <div className='flex flex-col gap-1 flex-wrap flex-shrink'>
        {filteredUsers?.slice(0, 5).map((user) => {
          return (
            <UserProfileCard
              key={user.id}
              name={user.name}
              username={user.email}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsersToFollow;
