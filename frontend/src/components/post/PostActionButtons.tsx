import {
  AddBookmarkIcon,
  CommentIcon,
  LikeIcon,
  ShareIcon,
} from "../../assets/icons";

type Props = {
  handleCopyLink: () => void;
};

const PostActionButtons = ({ handleCopyLink }: Props) => {
  return (
    <div>
      <div className='border-b border-t p-4 mt-6 mb-10 flex justify-between'>
        <div className='flex items-center'>
          <button className='flex items-center cursor-pointer mr-8 opacity-70 hover:opacity-100'>
            <LikeIcon />
            <span className='ml-1'>12</span>
          </button>
          <button className='flex items-center cursor-pointer opacity-70 hover:opacity-100'>
            <CommentIcon />
            <span className='ml-1'>8</span>
          </button>
        </div>
        <div className='flex items-center cursor-pointer'>
          <button className='mr-8 opacity-70 hover:opacity-100'>
            <AddBookmarkIcon />
          </button>
          <button
            onClick={handleCopyLink}
            className='opacity-70 hover:opacity-100'>
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostActionButtons;
