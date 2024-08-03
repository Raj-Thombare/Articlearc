import { useState } from "react";
import { SigninType } from "@raj-thombare/medium-common-types";
import Quote from "../components/Quote";
import AuthHeader from "../components/AuthHeader";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import { useAuth } from "../hooks/auth";

const Signin = () => {
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  });

  const { signin } = useAuth();

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <div className='h-screen flex justify-center flex-col'>
          <div className='flex justify-center'>
            <div>
              <AuthHeader type='signin' />
              <div className='pt-3'>
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
                  label={"Sign in"}
                  onClick={() => signin(postInput.email, postInput.password)}
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

export default Signin;
