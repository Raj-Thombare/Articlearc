import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { unslugify } from "../../utils";
import { usePostStore } from "../../store/postStore";
import { motion } from "framer-motion";

const RecommendedTopics = ({
  isActive,
  path,
}: {
  isActive?: string;
  path?: string;
}) => {
  const fetchAllTags = usePostStore((state) => state.fetchAllTags);
  const tags = usePostStore((state) => state.tags);

  useEffect(() => {
    if (!tags) {
      fetchAllTags();
    }
  }, [tags]);

  const allTags = tags?.flatMap((tag: { name: string }) => tag.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
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
        {allTags?.slice(0, 7).map((tag) => {
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
        to='/tag/javascript'
        className='text-green-600 hover:text-green-700 text-sm'>
        See more topics
      </Link>
    </motion.div>
  );
};

export default React.memo(RecommendedTopics);
