import { useState } from "react";
import { SignupType } from "@raj-thombare/medium-common-types";
import Quote from "../components/auth/Quote";
import AuthHeader from "../components/auth/AuthHeader";
import LabelledInput from "../components/auth/LabelledInput";
import Button from "../components/ui/Button";

const Signup = () => {
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <div className='h-screen flex justify-center items-center'>
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
                onClick={() => {}}
                style='mt-4 w-full font-semibold text-white bg-gray-800 rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
