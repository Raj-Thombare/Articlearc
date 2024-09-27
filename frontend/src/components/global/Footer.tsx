import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const footerLinks = [
    {
      name: "About",
      link: "#",
    },
    {
      name: "Status",
      link: "#",
    },
    {
      name: "Help",
      link: "#",
    },
    {
      name: "Privacy",
      link: "#",
    },
    {
      name: "Term",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
    {
      name: "Careers",
      link: "#",
    },
  ];
  return (
    <footer
      className={`${
        pathname.startsWith("/profile") ? "hidden md:block" : "block"
      }`}>
      <div className='w-full px-4 md:px-0 mx-auto flex flex-col md:flex-row items-center justify-center md:items-center md:justify-between'>
        <ul className='flex flex-wrap items-center mt-4 text-sm font-normal text-text'>
          {footerLinks.map((item) => {
            return (
              <li key={item.name}>
                <Link to={item.link} className='hover:underline me-3 md:me-4'>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
