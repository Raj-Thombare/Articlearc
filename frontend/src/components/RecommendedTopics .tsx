import { Link } from "react-router-dom";

const RecommendedTopics = ({ tags }: { tags: string[] }) => {
  return (
    <div className='px-4 md:px-0 mt-4'>
      <h3 className='font-semibold mb-4'>Recommended topics</h3>
      <div className='flex flex-wrap gap-2'>
        {tags.slice(0, 8).map((tag) => {
          return (
            <Link
              to={`/tag/${tag}`}
              key={tag}
              className='bg-gray-100 px-4 py-1.5 rounded-full cursor-pointer'>
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedTopics;
