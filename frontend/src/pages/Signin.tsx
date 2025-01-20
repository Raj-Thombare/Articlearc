import { useState } from "react";
import { SigninType } from "@raj-thombare/medium-common-types";
import AuthHeader from "../components/auth/AuthHeader";
import LabelledInput from "../components/auth/LabelledInput";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useUserStore } from "../store/userStore";
import { motion } from "framer-motion";

const test_email = import.meta.env.VITE_TEST_USER_EMAIL;
const test_password = import.meta.env.VITE_TEST_USER_PASSWORD;

const Signin = () => {
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signin, authUser } = useAuthStore();
  const { fetchBookmarks } = useUserStore();

  const { showToast } = useToast();

  const signinHandler = async (email: string, password: string) => {
    try {
      if (email && password) {
        await signin(email, password);
        showToast("Signed in successfully", "success");

        if (authUser?.id) {
          await fetchBookmarks(authUser.id);
        }
        navigate("/");
      } else {
        showToast("Please enter email & password", "warning");
      }
    } catch (error) {
      showToast(error.response.data.error, "error");
    }
  };

  const handleTestCredentials = () => {
    setPostInput({
      email: test_email,
      password: test_password,
    });
    signinHandler(test_email, test_password);
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      className='grid grid-cols-1 items-center mt-10 py-6 md:py-12'>
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-md px-10'>
          <AuthHeader type='signin' />
          <div className='pt-3'>
            <LabelledInput
              label='Email'
              placeholder='Rajthombare@gmail.com'
              value={postInput.email}
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label='Password'
              type='password'
              placeholder='Enter your password'
              value={postInput.password}
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <Button
              label='Sign in'
              onClick={() => signinHandler(postInput.email, postInput.password)}
              style='mt-4 w-full font-semibold text-white bg-gray-800 rounded-lg'
            />
            <Button
              label='Test Credentials'
              onClick={handleTestCredentials}
              style='mt-4 w-full font-semibold text-white bg-gray-800 rounded-lg'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signin;
