import { useParams } from "react-router-dom";
import Layout from "../components/global/Layout";

const Recommended = () => {
  const { tag } = useParams();

  return <Layout>{tag}</Layout>;
};

export default Recommended;
