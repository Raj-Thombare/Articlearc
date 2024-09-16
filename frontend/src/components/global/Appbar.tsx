import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { BiUser } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useToast } from "../../hooks/useToast";
import Mobile from "./MobileMenu";
import { BACKEND } from "../../config";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../search/SearchBar";
import SearchResultModal from "../search/SearchResultModal";
import { Post, User } from "../../lib/types";
import Button from "../ui/Button";

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobNavOpen, setMobNavOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const resultsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }

    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }

    if (
      mobNavOpen &&
      mobMenuRef.current &&
      !mobMenuRef.current.contains(event.target as Node)
    ) {
      setMobNavOpen(false);
    }
  };

  const navigate = useNavigate();

  const { signout, authUser, isAuthenticated } = useAuthStore();
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
      setShowResults(true);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }

    if (mobNavOpen) {
      setMobNavOpen(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobNav = () => {
    setMobNavOpen((mobNavOpen) => !mobNavOpen);
  };

  const signoutHandler = () => {
    signout();
    showToast("Signed out successfully", "success");
    navigate("/signin");
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchTerm.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        setShowResults(false);
      }
    },
    [navigate, searchTerm]
  );

  return (
    <nav className='bg-white h-[70px] w-full text-black border-gray-[#f2f2f2] border-b sticky top-0 left-0 z-50'>
      <div className='max-w-screen-2xl md:max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-3 px-4 md:px-8'>
        <div>
          <Link
            to='/'
            className='flex items-center flex-grow rtl:space-x-reverse'>
            <img
              src='/logo.png'
              alt='article arc logo'
              width={60}
              height={60}
            />
            <span className='self-center text-3xl font-bold whitespace-nowrap tracking-tighter'>
              Articlearc
            </span>
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          <SearchBar
            searchTerm={searchTerm}
            toggleMobNav={toggleMobNav}
            setSearchTerm={setSearchTerm}
            handleKeyDown={handleKeyDown}
            inputRef={searchInputRef}
          />
          {isAuthenticated && (
            <div className='md:block hidden ml-8'>
              <button
                className='text-lg text-black font-medium py-2 flex items-center mr-2 opacity-70 hover:opacity-100'
                onClick={() => navigate("/new-article")}>
                <IoCreateOutline size={25} />
                write
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div className='mx-4 md:block hidden opacity-70 hover:opacity-100 cursor-pointer'>
              <GoBell size={22} />
            </div>
          )}
          <div
            className='hidden md:flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-3'
            ref={menuRef}>
            {!isAuthenticated ? (
              <div className='flex items-center'>
                <Button
                  label='Sign in'
                  onClick={() => navigate("/signin")}
                  style='w-full font-semibold text-white bg-gray-800 rounded-lg mr-2'
                />
                <Button
                  label='Sign up'
                  onClick={() => navigate("/signup")}
                  style='w-full font-semibold text-white bg-gray-800 rounded-lg'
                />
              </div>
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
                  name={authUser?.name || ""}
                  size='w-10 h-10'
                  font='bold'
                  styles='text-base'
                />
              </button>
            )}
            {isAuthenticated && (
              <div
                ref={menuRef}
                className={`z-50 absolute top-8 right-0 ${
                  isOpen ? "block" : "hidden"
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                id='user-dropdown'>
                <div className='px-4 py-3'>
                  <span className='block text-md mt-1 font-semibold text-gray-900'>
                    {authUser?.name}
                  </span>
                  <span className='block text-sm  text-gray-500 truncate'>
                    {authUser?.email}
                  </span>
                </div>
                <ul className='py-2' aria-labelledby='user-menu-button'>
                  <li>
                    <Link
                      to={`/profile/${authUser?.id}`}
                      className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                      <BiUser fontSize={20} />
                      <span className='ml-1'>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/profile/${authUser?.id}/saved`}
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
            )}
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <Mobile
        mobMenuRef={mobMenuRef}
        mobNavOpen={mobNavOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        signoutHandler={signoutHandler}
        handleKeyDown={handleKeyDown}
        handleClickOutside={handleClickOutside}
      />
      {showResults && (users.length > 0 || posts.length > 0) && (
        <SearchResultModal
          resultsRef={resultsRef}
          posts={posts}
          users={users}
        />
      )}
    </nav>
  );
};

export default Appbar;
