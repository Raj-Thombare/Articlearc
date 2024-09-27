import React, { useState } from "react";
import { X, Image as ImageIcon, HelpCircle } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import Button from "../ui/Button";
import { usePostStore } from "../../store/postStore";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
};

const PublishModal = ({ setOpenModal, openModal }: Props) => {
  const { showToast } = useToast();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { publishPost, title, content, setTitle } = usePostStore();

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title || !content) {
      showToast("Title and content are required.", "error");
      return;
    }
    await publishPost(title, content);
    showToast("Article published successfully!", "success");
    closeModal();
  };

  return (
    <div
      className={`${
        openModal ? "fixed" : "hidden"
      } inset-0 z-50 flex items-center justify-center`}>
      <div className='bg-white w-full h-full p-4 xs:p-6 relative flex items-center justify-center overflow-y-auto animate-fade-in-pulse'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 p-1 md:p-3 w-[1040px]'>
          <button
            onClick={closeModal}
            className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-4'>
            <X className='h-6 w-6' />
          </button>
          {/* Left side */}
          <div className='space-y-4 p-1 md:p-10'>
            <h3 className='font-bold text-lg'>Story Preview</h3>
            <div className='space-y-4'>
              {coverImage ? (
                <div className='relative'>
                  <img
                    src={coverImage}
                    alt='Cover'
                    className='w-full h-48 object-cover rounded-md'
                  />
                  <button
                    onClick={() => setCoverImage(null)}
                    className='absolute top-2 right-2'>
                    <X className='h-4 w-4' />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor='cover-image'
                  className='flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400'>
                  <ImageIcon className='h-8 w-8 text-gray-400' />
                  <span className='ml-2 text-gray-600'>Upload Image</span>
                </label>
              )}
              <input
                id='cover-image'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
              />
              <p className='text-sm text-gray-500'>
                Include a high-quality image to enhance your article.
              </p>
              <div className='space-y-4'>
                <label htmlFor='title' className='font-bold text-base'>
                  Write a preview title
                </label>
                <input
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Enter your title'
                  className='w-full focus:ring-0 focus:border-none focus:outline-none bg-gray-100 px-4 py-3'
                />
              </div>
              <p className='text-sm text-gray-500 font-normal mt-2'>
                <span className='font-bold'>Note:</span> Changes here will
                affect how your story appears in public places like Medium’s
                homepage and in subscribers’ inboxes — not the contents of the
                story itself.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className='flex flex-col justify-between p-1 md:p-10'>
            <div className='space-y-4'>
              <div className='flex items-left space-x-0 xs:space-x-2 text-lg flex-col xs:flex-row'>
                <p className='font-normal'>Publishing to:</p>
                <span className='font-bold'>Raj Thombare</span>
              </div>

              <div className='space-y-2'>
                <label htmlFor='tags' className='text-gray-700 text-sm'>
                  Add or change topics (up to 5) so readers know what your story
                  is about
                </label>
                <div>
                  {tags.length < 5 && (
                    <input
                      placeholder='Add a tag...'
                      onKeyDown={handleTagInput}
                      className='flex-grow focus:ring-0 focus:border-none focus:outline-none bg-gray-100 px-4 py-3 mb-4 w-full'
                    />
                  )}
                  <div className='flex flex-wrap gap-2'>
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className='bg-gray-200 px-2 py-1 rounded-full text-base flex items-center'>
                        {tag}
                        <button onClick={() => removeTag(tag)} className='ml-1'>
                          <X className='h-3 w-3' />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <HelpCircle className='h-4 w-4 text-gray-400' />
                <span className='text-sm text-gray-600'>
                  Learn more about publishing.
                </span>
              </div>
              <Button
                label='Publish now'
                onClick={handlePublish}
                style='w-full font-medium text-white bg-btn-primary rounded-lg mr-2'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
