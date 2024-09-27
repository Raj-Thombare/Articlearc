import { Link } from "react-router-dom";

interface Props {
  type: string;
}

const AuthHeader = ({ type }: Props) => {
  return (
    <div>
      <div className='text-3xl font-extrabold mb-2 text-center'>
        {type === "signup" ? "Create an account" : "Log in your account"}
      </div>
      <div className='text-slate-500 text-center'>
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className='underline ps-1'>
          {type === "signup" ? "Signin" : "Signup"}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
