import { useState } from "react";
import { SignupType } from "@raj-thombare/medium-common-types";
import AuthHeader from "../components/auth/AuthHeader";
import LabelledInput from "../components/auth/LabelledInput";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
import { motion } from "framer-motion";

const Signup = () => {
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signup } = useAuthStore();

  const { showToast } = useToast();

  const signupHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      if (email && password && name) {
        await signup(name, email, password);
        showToast("Signed up successfully", "success");
        navigate("/");
      } else {
        showToast("Please enter email and password", "warning");
      }
    } catch (error) {
      showToast(error.response.data.error, "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
      className='grid grid-cols-1 items-center mt-10 py-6 md:py-12'>
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-md px-10'>
          <AuthHeader type='signup' />
          <div className='pt-3'>
            <LabelledInput
              label='Name'
              placeholder='Raj Thombare'
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label='Email'
              placeholder='Rajthombare@gmail.com'
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
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <Button
              label='Sign up'
              onClick={() =>
                signupHandler(
                  postInput.name!,
                  postInput.email,
                  postInput.password
                )
              }
              style='mt-4 w-full font-bold text-white bg-gray-800 rounded-lg'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
