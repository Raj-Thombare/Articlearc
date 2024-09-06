import { Link } from "react-router-dom";

const Footer = () => {

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
    <footer className='bg-white border-t'>
      <div className='w-full px-4 md:px-0 mx-auto flex flex-col md:flex-row items-center justify-center md:items-center md:justify-between'>
        <ul className='flex flex-wrap items-center mt-4 text-sm font-medium text-gray-500'>
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
