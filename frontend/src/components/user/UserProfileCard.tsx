import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

interface Props {
  name: string;
  username?: string;
}

const UserProfileCard = ({ name, username }: Props) => {
  return (
    <div className='flex justify-between flex-shrink items-center my-2'>
      <div className='flex items-center flex-1 mr-1 md:mr-2'>
        <Avatar
          name={name}
          size='min-w-10 min-h-10 md:w-12 md:h-12'
          font='bold'
          styles='text-xl'
        />
        <div className='space-y-0.5 ms-3'>
          <div className='font-medium'>{name}</div>
          <div className='text-gray-500 text-sm text-wrap h-fit'>
            @{username?.replace(/@(gmail\.com|test\.com)$/, "")}
          </div>
        </div>
      </div>
      <Button
        label='Follow'
        size='sm'
        font='text-sm'
        style='border border-gray-800 rounded-full px-4 py-2 hover:bg-gray-800 hover:text-white'
        onClick={() => {}}
      />
    </div>
  );
};

export default UserProfileCard;