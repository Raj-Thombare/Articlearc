import { RefObject } from "react";

interface Props {
  toggleMobNav: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

const SearchBar = ({
  toggleMobNav,
  searchTerm,
  setSearchTerm,
  handleKeyDown,
  inputRef,
}: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-between mx-auto'>
      <div className='flex md:order-2'>
        <button
          type='button'
          // onClick={toggleMobNav}
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
            type='search'
            id='search-navbar'
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
            placeholder='Search...'
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={toggleMobNav}
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
