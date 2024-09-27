import { Modal } from "flowbite-react";
import { useToast } from "../../hooks/useToast";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
};

const DeleteModal = ({ setOpenModal, openModal }: Props) => {
  const { deleteUser } = useUserStore();
  const { authUser, signout } = useAuthStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const closeModal = () => {
    setOpenModal(false);
  };

  const deleteAccountHandler = async () => {
    if (authUser) {
      try {
        await deleteUser(authUser.id);
        signout();
        showToast("Account deleted successfully!", "success");
        navigate("/signin");
      } catch (error) {
        console.error("Failed to delete account:", error);
        showToast("Failed to delete account. Please try again.", "error");
      }
    }
  };

  return (
    <Modal show={openModal} size='md' onClose={closeModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='space-y-6 text-center'>
          <svg
            className='mx-auto mb-4 text-gray-400 w-12 h-12'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <h3 className='mb-5 text-lg font-normal text-gray-500'>
            Are you sure you want to delete your account?
          </h3>
          <div className='flex justify-center'>
            <button
              onClick={deleteAccountHandler}
              type='button'
              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5'>
              Yes, I'm sure
            </button>
            <button
              onClick={closeModal}
              type='button'
              className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100'>
              No, cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
