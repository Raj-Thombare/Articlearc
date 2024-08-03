import { useState } from "react";
import { SignupType } from "@raj-thombare/medium-common-types";
import Quote from "../components/Quote";
import AuthHeader from "../components/AuthHeader";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import { useAuth } from "../hooks/auth";

const Signup = () => {
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const { signup } = useAuth();

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <div className='h-screen flex justify-center flex-col'>
          <div className='flex justify-center'>
            <div>
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
                  label={"Sign up"}
                  onClick={() =>
                    signup(postInput.name, postInput.email, postInput.password)
                  }
                />
              </div>
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
