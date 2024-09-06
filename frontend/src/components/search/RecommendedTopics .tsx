import { Link } from "react-router-dom";
import AsideSkeleton from "../loader/AsideSkeleton";

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
        <div className={` ${path?.startsWith("/tag") ? "mb-10" : ""} `}>
          {!path?.startsWith("/tag") && (
            <h3 className='font-semibold mb-4'>Recommended topics</h3>
          )}
          <div
            className={`flex flex-wrap gap-2 ${
              path?.startsWith("/tag") ? "justify-center" : ""
            }`}>
            {tags.map((tag) => {
              return (
                <Link
                  to={`/tag/${tag}`}
                  key={tag}
                  className={`bg-gray-100 px-4 py-1.5 rounded-full cursor-pointer ${
                    isActive === tag ? "border border-gray-800" : ""
                  }`}>
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <AsideSkeleton />
      )}
    </>
  );
};

export default RecommendedTopics;
