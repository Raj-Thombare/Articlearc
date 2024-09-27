import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { usePostStore } from "../store/postStore";

const Publish = () => {
  const { title, content, setTitle, setContent } = usePostStore();

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = e.currentTarget.innerText;
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className='flex justify-center w-full px-5 py-6 md:py-12'>
      <div className='max-w-screen-md w-full'>
        <h3
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
          className='text-4xl leading-none outline-none cursor-text placeholder:text-[#B3B3B1] font-serif py-2 px-3'
          data-placeholder='Title'>
          {title}
        </h3>
        <ReactQuill
          theme='bubble'
          placeholder='Tell your story...'
          className='write font-serif'
          value={content}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default Publish;
