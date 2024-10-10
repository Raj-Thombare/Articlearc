import { useParams } from "react-router-dom";
import PostDetails from "../components/post/PostDetails";
import Spinner from "../components/loader/Spinner";
import { usePostStore } from "../store/postStore";
import { useEffect } from "react";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { post, isLoading, fetchPost } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  return (
    <div
      className={`w-full ${
        isLoading ? "h-[80vh]" : "h-full"
      } flex content-center items-center justify-center`}>
      {!isLoading && post ? (
        <PostDetails post={post!} />
      ) : (
        <Spinner size='w-8 h-8' />
      )}
    </div>
  );
};

export default Post;
