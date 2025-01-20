import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { motion } from "framer-motion";

interface Props {
  name: string;
  username?: string;
  id: string;
  about?: string;
}

const UserProfileCard = ({ name, username, id, about }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
      className='flex justify-between flex-shrink items-start'>
      <Link
        to={`/profile/${id}`}
        className='flex items-start mr-1 md:mr-2 py-2'>
        <Avatar
          name={name}
          size='min-w-12 min-h-12 w-4 h-4'
          font='bold'
          styles='text-base'
        />
        <div className='ms-3'>
          <div className='font-medium text-base tracking-tight'>{name}</div>
          <div className='text-gray-500 font-normal text-sm text-wrap h-fit'>
            @{username?.replace(/@(gmail\.com|test\.com)$/, "")}
          </div>
          <div className='text-sm text-wrap font-normal'>{about}</div>
        </div>
      </Link>
      <div className='py-2'>
        <Button
          label='Follow'
          size='xs'
          font='text-sm'
          style='border border-black-600 rounded-full px-4 py-2 bg-gray-800 text-white hover:text-slate-800 hover:bg-white'
          onClick={() => {}}
        />
      </div>
    </motion.div>
  );
};

export default React.memo(UserProfileCard);
