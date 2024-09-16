import axios from "axios";
import { BACKEND } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import Button from "../components/ui/Button";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const publishPostHandler = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND}/api/v1/post`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/post/${data.id}`);
    } catch (error) {
      alert("Error publishing post");
    }
  };

  return (
    <div className='flex justify-center w-full px-5 py-6 md:py-12'>
      <div className='max-w-screen-md w-full'>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
          placeholder='Title'
        />

        <TextEditor
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Button
          label='Publish post'
          size='text-lg'
          font='text-base'
          style='rounded-lg border border-gray-800 rounded-full px-4 py-2 hover:bg-gray-800 hover:text-white'
          onClick={publishPostHandler}
        />
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className='mt-2'>
      <div className='w-full mb-4 '>
        <div className='flex items-center justify-between border'>
          <div className='my-2 bg-white rounded-b-lg w-full'>
            <label className='sr-only'>Publish post</label>
            <textarea
              onChange={onChange}
              id='editor'
              rows={20}
              className='focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2'
              placeholder='Write an article...'
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
