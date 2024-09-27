import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

interface Props {
  name: string;
  username?: string;
  id: string;
}

const UserProfileCard = ({ name, username, id }: Props) => {
  return (
    <div className='flex justify-between flex-shrink items-center my-2'>
      <div className='flex items-center flex-1 mr-1 md:mr-2'>
        <Avatar
          name={name}
          size='min-w-10 min-h-10 md:w-12 md:h-12'
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
        </div>
      </div>
      <Button
        label='Follow'
        size='sm'
        font='text-sm'
        style='border border-black-600 rounded-full px-4 py-2 bg-gray-800 text-white hover:text-slate-800 hover:bg-white'
        onClick={() => {}}
      />
    </div>
  );
};

export default UserProfileCard;
