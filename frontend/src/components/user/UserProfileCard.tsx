import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

interface Props {
  name: string;
  username?: string;
  id: string;
  about?: string;
}

const UserProfileCard = ({ name, username, id, about }: Props) => {
  return (
    <div className='flex justify-between flex-shrink items-start'>
      <div className='flex items-start mr-1 md:mr-2 py-2'>
        <Avatar
          name={name}
          size='min-w-14 min-h-14 w-14 h-14'
          font='bold'
          styles='text-xl'
        />
        <div className='ms-3'>
          <Link
            to={`/profile/${id}`}
            className='font-medium text-base tracking-tight'>
            {name}
          </Link>
          <div className='text-gray-500 font-normal text-sm text-wrap h-fit'>
            @{username?.replace(/@(gmail\.com|test\.com)$/, "")}
          </div>
          <div className='text-sm text-wrap font-normal'>{about}</div>
        </div>
      </div>
      <div className='py-2'>
        <Button
          label='Follow'
          size='sm'
          font='text-sm'
          style='border border-black-600 rounded-full px-4 py-2 bg-gray-800 text-white hover:text-slate-800 hover:bg-white'
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default React.memo(UserProfileCard);
