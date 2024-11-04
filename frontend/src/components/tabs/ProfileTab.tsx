import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import EditModalProfile from "../modal/EditProfileModal";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const ProfileTab = React.memo(() => {
  const { user } = useUserStore();
  const { authUser } = useAuthStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className='flex flex-col mb-10 md:mb-0 py-6 md:py-0'>
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
              <span className='mr-1'>1.2M</span>Followers
            </p>
            <p className='font-semibold text-base'>
              <span className='mr-1'>9K</span>Following
            </p>
          </div>
          {user?.about && (
            <p className='text-base font-normal text-slate-500 mt-3 p-4 md:p-0'>
              {user?.about}
            </p>
          )}
          <div className='flex flex-row justify-center md:justify-start items-center w-full'>
            {authUser?.id !== user?.id && (
              <Button
                label='Follow'
                size='sm'
                font='text-sm'
                style='border border-black-600 text-white bg-black rounded-lg px-4 py-2 hover:text-slate-800 hover:bg-white mt-4 mr-4'
                onClick={() => {}}
              />
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
    </div>
  );
});

export default ProfileTab;
