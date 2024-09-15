import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import Button from "../ui/Button";
import DeleteModal from "../modal/DeleteModal";

const SettingsTab = () => {
  const { user } = useUserStore();
  const { authUser } = useAuthStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className='flex flex-col mb-10 md:mb-0 py-6 md:py-0'>
      <div className='mb-6'>
        <div className='font-semibold'>Account</div>
        <div className='text-slate-700 bg-gray-100 p-4 rounded-xl mt-2 text-sm'>
          <div className='font-bold'>Email address: </div>
          <div className=''>{authUser?.email}</div>
        </div>
      </div>

      <div className='mb-6'>
        <form className='max-w-sm mx-auto'>
          <label
            htmlFor='theme'
            className='block mb-2 font-semibold text-gray-900 dark:text-white'>
            Theme
          </label>
          <select
            id='theme'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            defaultValue='light'>
            <option value='light'>light</option>
            <option value='dark'>dark</option>
            <option value='system'>system</option>
          </select>
        </form>
      </div>

      <div className='mb-6'>
        <form className='max-w-sm mx-auto'>
          <label
            htmlFor='theme'
            className='block mb-2 font-semibold text-gray-900 dark:text-white'>
            Language
          </label>
          <select
            id='theme'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            defaultValue='eng'>
            <option value='eng'>English</option>
            <option value='hin'>Hindi</option>
            <option value='mar'>Marathi</option>
            <option value='jap'>Japanese</option>
            <option value='ger'>German</option>
            <option value='det'>Deutsch</option>
            <option value='esp'>Espanol</option>
          </select>
        </form>
      </div>

      <div className='font-semibold flex items-center justify-between'>
        <div>Public Profile</div>
        <div>
          <label className='inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              checked
              readOnly></input>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className='border-t mt-4'>
        <div className='text-red-600 font-bold mt-2 pt-2'>Danger Zone</div>
        {authUser?.id === user?.id && (
          <Button
            label='Delete Account'
            size='sm'
            font='text-sm'
            style='border bg-red-600 rounded px-4 py-2 text-white mt-4'
            onClick={() => setOpenModal(true)}
          />
        )}
        {openModal && (
          <DeleteModal setOpenModal={setOpenModal} openModal={openModal} />
        )}
      </div>
    </div>
  );
};

export default SettingsTab;
