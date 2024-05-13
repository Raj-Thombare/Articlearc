import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();

  const { blog, loading } = useBlog({
    id: id || "",
  });

  return (
    <Layout>
      <div
        className={`w-full ${
          loading ? "h-[80vh]" : "h-full"
        } flex content-center items-center justify-center`}
      >
        {!loading ? <FullBlog blog={blog} /> : <Spinner />}
      </div>
    </Layout>
  );
};

export default Blog;
