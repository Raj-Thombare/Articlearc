import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { BiUser } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/toast";
import Mobile from "./Mobile";
import { BACKEND } from "../../config";
import axios from "axios";
import useDebounce from "../../hooks/debounce";
import SearchBar from "../search/SearchBar";
import SearchResult from "../search/SearchResult";
import { Blog, User } from "../../lib/types";
import Button from "../ui/Button";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  const navigate = useNavigate();

  const { signout, user, isAuthenticated } = useAuthStore();

  const { showToast } = useToast();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSearchResults = useCallback(async () => {
    if (debouncedSearchTerm) {
      const res = await axios.get(
        `${BACKEND}/api/v1/search?query=${debouncedSearchTerm}`
      );
      setUsers(res.data.users);
      setPosts(res.data.posts);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

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
    <nav className='bg-white h-[70px] text-black border-gray-[#f2f2f2] border-b sticky top-0 left-0 z-50'>
      <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-3 px-4 md:px-8'>
        <Link
          to='/'
          className='flex items-center flex-grow rtl:space-x-reverse'>
          <img src='/logo.png' alt='article arc logo' width={60} height={60} />
          <span className='hidden md:block self-center text-3xl font-bold whitespace-nowrap'>
            ArticleArc
          </span>
        </Link>
        <div className='flex justify-between items-center'>
          <SearchBar
            setShowResults={setShowResults}
            searchTerm={searchTerm}
            toggleNav={toggleNav}
            setSearchTerm={setSearchTerm}
          />
          <div className='md:block hidden ml-8'>
            <button
              className='text-lg text-black font-medium py-2 flex items-center mr-2 opacity-70 hover:opacity-100'
              onClick={() => navigate("/new-article")}>
              <IoCreateOutline size={25} />
              write
            </button>
          </div>
          {isAuthenticated && (
            <div className='mx-4 md:block hidden'>
              <GoBell size={22} />
            </div>
          )}

          <div className='hidden md:flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-3'>
            {!isAuthenticated ? (
              <Button
                label='Sign in'
                onClick={() => navigate("/signin")}
                style='w-full font-semibold text-white bg-gray-800 rounded-lg'
              />
            ) : (
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
            )}
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
                    to={`/profile/${user?.id}`}
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <BiUser fontSize={20} />
                    <span className='ml-1'>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/profile/${user?.id}/saved`}
                    className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                    <GoBookmark fontSize={20} />
                    <span className='ml-1'>Saved</span>
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
      {navOpen && (
        <Mobile
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          signoutHandler={signoutHandler}
        />
      )}
      {showResults && (
        <SearchResult resultsRef={resultsRef} posts={posts!} users={users!} />
      )}
    </nav>
  );
};

export default Appbar;
