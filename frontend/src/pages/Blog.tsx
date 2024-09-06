import { useParams } from "react-router-dom";
import FullBlog from "../components/blog/FullBlog";
import Spinner from "../components/loader/Spinner";
import { useBlogStore } from "../store/blogStore";
import { useEffect } from "react";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, isLoading, fetchBlog } = useBlogStore();

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id, fetchBlog]);

  return (
    <div
      className={`w-full ${
        isLoading ? "h-[80vh]" : "h-full"
      } flex content-center items-center justify-center`}>
      {!isLoading && blog ? (
        <FullBlog blog={blog!} />
      ) : (
        <Spinner size='w-8 h-8' />
      )}
    </div>
  );
};

export default Blog;
