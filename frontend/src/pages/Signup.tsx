import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupType } from "@raj-thombare/medium-common-types";
import { BACKEND } from "../config";
import Quote from "../components/Quote";
import AuthHeader from "../components/AuthHeader";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";

const Signup = () => {
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signupHandler = async () => {
    try {
      const jwt = await axios.post(`${BACKEND}/api/v1/user/signup`, postInput);
      localStorage.setItem("token", jwt.data.token);
      navigate("/blogs");
    } catch (error) {
      alert("Error sending request");
    }
  };

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
                  label='Username'
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
                <Button label={"Sign up"} onClick={signupHandler} />
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
