import { useState } from "react";
import { Avatar } from "./BlogCard";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className='bg-white text-black border-gray-200 border-b'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-5'>
        <a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            Medium
          </span>
        </a>
        <div className='flex justify-between basis-20'>
          <button
            type='button'
            className='flex flex-column items-center text-gray-500 hover:text-gray-900'
          >
            <HiOutlinePencilSquare fontSize={24} />
            <span className='text-sm ml-1'>Write</span>
          </button>
          <div className='flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-8'>
            <button
              onClick={toggleMenu}
              type='button'
              className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'
            >
              <span className='sr-only'>Open user menu</span>
              <Avatar name={"Raj"} size='big' font='bold' />
            </button>
            <div
              className={`z-50 absolute top-8 right-0 ${
                isOpen ? "block" : "hidden"
              } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-md mt-1 font-semibold text-gray-900'>
                  Raj Thombare
                </span>
                <span className='block text-sm  text-gray-500 truncate'>
                  rajthombare@gmail.com
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <a
                    href='#'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                  >
                    <BiUser fontSize={20} />
                    <span className='ml-1'>Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                  >
                    <GoBookmark fontSize={20} />
                    <span className='ml-1'>Bookmark</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                  >
                    <IoLogOutOutline fontSize={20} />
                    <span className='ml-1'>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
