import { BlogCard } from "../components/BlogCard";

type Props = {};

const Blogs = (props: Props) => {
  return (
    <div>
      <div className='flex justify-center'>
        <div>
          <BlogCard
            id={1}
            authorName='Raj Thombare'
            title='Understanding SOLID Principles in JavaScript and Node.js'
            content='SOLID is a set of principles in object-oriented programming that aims to create scalable, maintainable, and flexible software. ...'
            publishedDate={"Feb 23, 2024"}
          />
          <BlogCard
            id={1}
            authorName='Raj Thombare'
            title='Complete GraphQL Guide'
            content='jaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsad...'
            publishedDate={"Feb 23, 2024"}
          />
          <BlogCard
            id={1}
            authorName='Raj Thombare'
            title='Complete GraphQL Guide'
            content='jaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsadjaksdjlksajdklsadlknsadjnsadnsad...'
            publishedDate={"Feb 23, 2024"}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
