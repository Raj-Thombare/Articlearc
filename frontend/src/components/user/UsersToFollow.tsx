import React, { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import UserProfileCard from "./UserProfileCard";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UsersToFollow = () => {
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);
  const users = useUserStore((state) => state.users);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!users) {
      fetchAllUsers();
    }
  }, [users]);

  const filteredUsers = users?.filter((u) => u.id !== authUser?.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      className='mt-8 px-4 md:px-0'>
      <h3 className='font-bold mb-4 text-base'>People to follow</h3>
      <div className='flex flex-col gap-1 flex-wrap flex-shrink mb-4'>
        {filteredUsers?.slice(0, 5).map((user) => {
          return (
            <UserProfileCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.email}
              about={user.about}
            />
          );
        })}
      </div>
      <Link to='/' className='text-green-600 hover:text-green-700 text-sm'>
        See more suggestions
      </Link>
    </motion.div>
  );
};

export default React.memo(UsersToFollow);
