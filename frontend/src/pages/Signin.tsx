import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninType } from "@raj-thombare/medium-common-types";
import { BACKEND } from "../config";
import Quote from "../components/Quote";
import AuthHeader from "../components/AuthHeader";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";

const Signin = () => {
  const [postInput, setPostInput] = useState<SigninType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signinHandler = async () => {
    try {
      const jwt = await axios.post(`${BACKEND}/api/v1/user/signin`, postInput);
      localStorage.setItem("token", jwt.data.token);
      navigate("/");
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
              <AuthHeader type='signin' />
              <div className='pt-3'>
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
                <Button label={"Sign in"} onClick={signinHandler} />
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
