import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { BiUser } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className='bg-white text-black border-gray-200 border-b'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-5'>
        <a href='/' className='flex items-center rtl:space-x-reverse'>
          <img src='/logo.png' alt='article arc logo' width={30} height={30} />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            rticalArc
          </span>
        </a>
        <div className='flex justify-between basis-20'>
          <button
            onClick={() => {
              navigate("/publish");
            }}
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Create
          </button>

          <div className='flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-3'>
            <button
              onClick={toggleMenu}
              type='button'
              className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'>
              <span className='sr-only'>Open user menu</span>
              <Avatar
                name={"Raj"}
                size='w-8 h-8'
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
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <BiUser fontSize={20} />
                    <span className='ml-1'>Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <GoBookmark fontSize={20} />
                    <span className='ml-1'>Bookmark</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
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
