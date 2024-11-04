import { Textarea, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useToast } from "../../hooks/useToast";
import { useAuthStore } from "../../store/authStore";
import Avatar from "../ui/Avatar";
import { User } from "../../lib/types";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};

const EditProfileModal = ({ setOpenModal, openModal, user }: Props) => {
  const { updateUser } = useUserStore();
  const { authUser } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const { showToast } = useToast();

  function onCloseModal() {
    setOpenModal(false);
    setName("");
    setEmail("");
    setAbout("");
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAbout(user.about);
    }
  }, [user, openModal]);

  const updateUserHandler = async () => {
    if (!name && !email && !about) {
      showToast("Please enter fields!", "warning");
    } else {
      if (authUser) {
        await updateUser(authUser.id, name, email, about);
        showToast("User updated successfully!", "success");
        onCloseModal();
      }
    }
  };

  return (
    <>
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl text-center font-bold text-gray-900 dark:text-white'>
              Profile information
            </h3>
            <div className='flex justify-center'>
              <Avatar
                name={authUser?.name!}
                size='w-36 h-36 md:w-28 md:h-28'
                font='bold'
                styles='text-4xl md:text-3xl'
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Name*' />
              </div>
              <TextInput
                id='name'
                placeholder='John Doe'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={50}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Email*' />
              </div>
              <TextInput
                id='email'
                placeholder='name@gmail.com'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='about' value='Short bio' />
              </div>
              <Textarea
                id='about'
                value={about}
                required
                rows={4}
                onChange={(event) => setAbout(event.target.value)}
                maxLength={160}
              />
            </div>
            <div className='w-full flex justify-center'>
              <button
                className='border border-black-600 text-white bg-black rounded-lg px-4 py-2 hover:text-slate-800 hover:bg-white mr-4'
                onClick={updateUserHandler}>
                Update
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfileModal;
