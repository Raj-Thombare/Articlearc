import { Link } from "react-router-dom";
import AsideSkeleton from "../loader/AsideSkeleton";
import { unslugify } from "../../utils";

const RecommendedTopics = ({
  tags,
  isLoading,
  isActive,
  path,
}: {
  tags: string[];
  isLoading?: boolean;
  isActive?: string;
  path?: string;
}) => {
  return (
    <>
      {!isLoading ? (
        <div
          className={` ${
            path?.startsWith("/tag") ? "mb-10" : "mt-8 md:mt-0 px-4 md:px-0"
          } `}>
          {!path?.startsWith("/tag") && (
            <h3 className='font-bold mb-4 text-base'>Recommended topics</h3>
          )}
          <div
            className={`flex gap-2 flex-wrap mb-4 ${
              path?.startsWith("/tag") ? "justify-center" : ""
            }`}>
            {tags.slice(0, 6).map((tag) => {
              return (
                <Link
                  to={`/tag/${tag}`}
                  key={tag}
                  className={`bg-background text-sm font-medium px-4 whitespace-nowrap py-1.5 rounded-full cursor-pointer flex-wrap ${
                    isActive === tag ? "border border-gray-800" : ""
                  }`}>
                  {unslugify(tag)}
                </Link>
              );
            })}
          </div>
          <Link
            to='/tag/react'
            className='text-green-600 hover:text-green-700 text-sm'>
            See more topics
          </Link>
        </div>
      ) : (
        <AsideSkeleton />
      )}
    </>
  );
};

export default RecommendedTopics; 
