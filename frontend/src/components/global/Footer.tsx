import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-white rounded-lg border-t'>
      <div className='w-full mx-auto max-w-screen-2xl p-4 flex flex-col md:flex-row items-center justify-center md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center'>
          © 2024{" "}
          <Link to='https://articlearc.vercel.app/' className='hover:underline'>
            ArticleArc™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0'>
          <li>
            <Link to='#' className='hover:underline me-4 md:me-6'>
              About
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:underline me-4 md:me-6'>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:underline me-4 md:me-6'>
              Licensing
            </Link>
          </li>
          <li>
            <Link to='#' className='hover:underline'>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
