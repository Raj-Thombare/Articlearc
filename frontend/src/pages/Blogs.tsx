import { BlogCard } from "../components/BlogCard";
import Appbar from "../components/Appbar";

type Props = {};

const Blogs = (props: Props) => {
  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='max-w-2xl'>
          <BlogCard
            id={1}
            authorName='Raj Thombare'
            title='How Elasticsearch Works'
            content='On our way home from work, we remember that we need to buy some milk. We see a supermarket and decide to stop in, but as soon as we enter, we are greeted by rows and rows of aisles and shelves, making it impossible for us to find the milk'
            publishedDate={"Feb 23, 2024"}
          />
          <BlogCard
            id={2}
            authorName='Yashaswi Jaiswal'
            title='Complete GraphQL Guide'
            content='SOLID is a set of principles in object-oriented programming that aims to create scalable, maintainable, and flexible software'
            publishedDate={"Jun 23, 2024"}
          />
          <BlogCard
            id={3}
            authorName='Shardul Thakur'
            title='Complete GraphQL Guide'
            content='SOLID is a set of principles in object-oriented programming that aims to create scalable, maintainable, and flexible software'
            publishedDate={"Mar 13, 2024"}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
