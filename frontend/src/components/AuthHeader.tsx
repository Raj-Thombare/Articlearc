import { Link } from "react-router-dom";

interface Props {
  type: string;
}

const AuthHeader = ({ type }: Props) => {
  return (
    <div className='px-10'>
      <div className='text-3xl font-extrabold mb-1'>
        {type == "signup" ? "Create an account" : "Log in to your account"}
      </div>
      <div className='text-slate-500 text-center'>
        {type == "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          to={type == "signup" ? "/signin" : "/signup"}
          className='underline ps-1'
        >
          {type == "signup" ? "Login" : "Signup"}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
