import { useRef } from "react";
import { Link } from "react-router-dom";
import { unslugify } from "../../utils";
import { ExploreIcon } from "../../assets/explore";
import { ArrowLeft, ArrowRight } from "../../assets/arrow";

const Carousel = ({
  tags,
  isActive,
}: {
  tags: string[];
  isActive: string | undefined;
  path: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className='relative flex items-center justify-center mb-10'>
      <button
        onClick={scrollLeft}
        className='absolute left-0 p-2 bg-white h-[38px] z-20'>
        <ArrowLeft />
      </button>
      <div
        ref={scrollRef}
        className='flex overflow-x-scroll space-x-4 scrollbar-hide py-2 px-10 items-center'>
        <div className='flex items-center justify-center bg-gray-100 w-auto px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap'>
          <ExploreIcon />
          <p className=' ml-2'>Explore Topics</p>
        </div>
        {tags.map((tag) => {
          return (
            <Link
              to={`/tag/${tag}`}
              key={tag}
              className={`bg-gray-100 w-auto px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap ${
                isActive === tag ? "border border-gray-800" : ""
              }`}>
              {unslugify(tag)}
            </Link>
          );
        })}
      </div>

      <button
        onClick={scrollRight}
        className='absolute right-0 z-20 p-2 bg-white h-[38px]'>
        <ArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
