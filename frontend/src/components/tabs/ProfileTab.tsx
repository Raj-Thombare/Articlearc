import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import EditModalProfile from "../modal/EditProfileModal";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { useToast } from "../../hooks/useToast";
import { motion } from "framer-motion";

const ProfileTab = React.memo(() => {
  const { user, followUser } = useUserStore();
  const { authUser } = useAuthStore();

  const { showToast } = useToast();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const followersList = user?.followers.flatMap((user) => {
    return user.follower?.id;
  });

  const isFollowing = followersList?.includes(authUser?.id!);

  const followUserHandler = (userId: string) => {
    try {
      followUser(userId);
      showToast(
        isFollowing ? "Unfollowed successfully" : "Followed successfully",
        "success"
      );
    } catch (error) {
      showToast("Failed to follow user", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      className='flex flex-col mb-10 md:mb-0 py-6 md:py-0'>
      <div className='flex flex-col items-center md:items-start'>
        <Avatar
          name={user?.name!}
          size='w-36 h-36 md:w-28 md:h-28'
          font='bold'
          styles='text-4xl md:text-3xl'
        />
        <div className='mt-6 text-base font-semibold w-full text-center md:text-left'>
          <p className='font-semibold text-lg'>{user?.name}</p>
          <p className='font-medium text-base text-slate-500'>
            @{user?.username}
          </p>
          <div className='flex w-full justify-center md:justify-start text-gray-500'>
            <p className='font-semibold text-base mr-4'>
              <span className='mr-1'>{user?._count.followers}</span>Followers
            </p>
            <p className='font-semibold text-base'>
              <span className='mr-1'>{user?._count.following}</span>Following
            </p>
          </div>
          {user?.about && (
            <p className='text-base font-normal mt-3 p-4 md:p-0'>
              {user?.about}
            </p>
          )}
          <div className='flex flex-row justify-center md:justify-start items-center w-full'>
            {authUser?.id !== user?.id && (
              <>
                <Button
                  label={isFollowing ? "Following" : "Follow"}
                  size='sm'
                  font='text-sm'
                  style={`border border-black-600  ${
                    isFollowing ? "bg-white text-black" : "bg-black text-white"
                  } rounded-lg px-4 py-2 hover:text-slate-800 hover:bg-white mt-4 mr-4`}
                  onClick={() => followUserHandler(user?.id!)}
                />
              </>
            )}
            {authUser?.id === user?.id && (
              <Button
                label='Edit profile'
                size='sm'
                font='text-sm'
                style='border border-slate-400 rounded-lg px-4 py-2 text-slate-900 mt-4'
                onClick={() => setOpenModal(true)}
              />
            )}
          </div>
        </div>
      </div>
      <EditModalProfile
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </motion.div>
  );
});

export default React.memo(ProfileTab);
