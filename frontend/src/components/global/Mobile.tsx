import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  signoutHandler: () => void;
}

const Mobile = ({ searchTerm, setSearchTerm, signoutHandler }: Props) => {
  const { user, isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  return (
    <div
      className='bg-white z-50 items-center flex-col justify-between w-full flex md:w-auto md:order-1'
      id='navbar-search'>
      <div className='relative mt-3 md:hidden'>
        <div
          onClick={() => {
            navigate(`/?query=${searchTerm}`);
          }}
          className='absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer'>
          <svg
            className='w-4 h-4 text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='text'
          id='search-navbar'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus-visible:outline-none'
          placeholder='Search...'
        />
      </div>
      <ul className='md:hidden w-full flex items-center flex-col p-4 font-medium border-b rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white'>
        <li>
          <Link
            to='/'
            className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'
            aria-current='page'>
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link
              to={`/profile/${user?.id}`}
              className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'
              aria-current='page'>
              Profile
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link
              to={`/profile/${user?.id}/saved`}
              className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
              Saved
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li onClick={signoutHandler}>
            <Link
              to='#'
              className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
              Sign out
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Button
              label='Sign in'
              onClick={() => navigate("/signin")}
              style='w-full font-semibold text-white bg-gray-800 rounded-lg'
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Mobile;
