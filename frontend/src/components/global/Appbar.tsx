import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../blog/BlogCard";
import { BiUser } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/toast";
import Mobile from "./Mobile";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();

  const { signout, user } = useAuthStore();

  const { showToast } = useToast();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const signoutHandler = () => {
    signout();
    showToast("Signed out successfully", "success");
    navigate("/signin");
  };

  return (
    <nav className='bg-white text-black border-gray-200 border-b sticky top-0 left-0 z-50 shadow-sm'>
      <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-3 px-8'>
        <Link to='/' className='flex items-center rtl:space-x-reverse'>
          <img src='/logo.png' alt='article arc logo' width={60} height={60} />
          <span className='hidden md:block self-center text-3xl font-bold whitespace-nowrap'>
            ArticleArc
          </span>
        </Link>
        <div className='flex justify-between items-center'>
          <div className='flex flex-wrap items-center justify-between mx-auto'>
            <div className='flex md:order-2'>
              <button
                type='button'
                onClick={toggleNav}
                data-collapse-toggle='navbar-search'
                aria-controls='navbar-search'
                aria-expanded='false'
                className='md:hidden text-gray-500  hover:bg-gray-100  rounded-lg text-sm p-2.5 me-1'>
                <svg
                  className='w-5 h-5'
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
                <span className='sr-only'>Search</span>
              </button>
              <div className='relative hidden md:block'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
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
                  <span className='sr-only'>Search icon</span>
                </div>
                <input
                  type='text'
                  id='search-navbar'
                  className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
                  placeholder='Search...'
                />
              </div>
              <button
                onClick={toggleNav}
                data-collapse-toggle='navbar-search'
                type='button'
                className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none'
                aria-controls='navbar-search'
                aria-expanded='false'>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 14'>
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 1h15M1 7h15M1 13h15'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className='md:block hidden ml-8'>
            <button
              className='text-lg text-black font-medium py-2 flex items-center'
              onClick={() => navigate("/new-article")}>
              <IoCreateOutline size={25} />
              write
            </button>
          </div>
          <div className='mx-4 md:block hidden'>
            <GoBell size={22} />
          </div>

          <div className='hidden md:flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-3'>
            <button
              onClick={toggleMenu}
              type='button'
              className='flex text-sm bg-gray-800 rounded-full md:me-0'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'>
              <span className='sr-only'>Open user menu</span>
              <Avatar
                name={user?.name || ""}
                size='w-10 h-10'
                font='bold'
                styles='text-base'
              />
            </button>
            <div
              className={`z-50 absolute top-8 right-0 ${
                isOpen ? "block" : "hidden"
              } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
              id='user-dropdown'>
              <div className='px-4 py-3'>
                <span className='block text-md mt-1 font-semibold text-gray-900'>
                  {user?.name}
                </span>
                <span className='block text-sm  text-gray-500 truncate'>
                  {user?.email}
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <Link
                    to='/profile'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <BiUser fontSize={20} />
                    <span className='ml-1'>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/bookmarks'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <GoBookmark fontSize={20} />
                    <span className='ml-1'>Bookmark</span>
                  </Link>
                </li>
                <li onClick={signoutHandler}>
                  <Link
                    to=''
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <IoLogOutOutline fontSize={20} />
                    <span className='ml-1'>Sign out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {navOpen && <Mobile />}
    </nav>
  );
};

export default Appbar;
