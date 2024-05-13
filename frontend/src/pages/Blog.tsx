import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: id || "",
  });

  return (
    <div>{!loading ? <FullBlog blog={blog} /> : <div>loading...</div>}</div>
  );
};

export default Blog;
