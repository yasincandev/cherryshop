import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { login } from "../store/reducers/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({ email, uid: user.user.uid }));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col-reveresed'>
      <Image
        src='/assets/login.jpg'
        alt='background'
        className='object-cover object-center h-screen w-7/12'
        width={600}
        height={600}
      />

      <div className='bg-white flex flex-col justify-center items-center w-5/12 shadow-lg'>
        <h1 className='text-3xl font-bold text-[#E43038] mb-2'>LOGIN</h1>
        <div className='w-1/2 text-center'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
            autoComplete='off'
            className='shadow-md border w-full h-10 px-3 py-2 text-black focus:outline-none focus:border-[#E43038] mb-3 rounded'
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            autoComplete='off'
            className='shadow-md border w-full h-10 px-3 py-2 text-black focus:outline-none focus:border-[#E43038] mb-3 rounded'
          />
          <button
            onClick={loginHandler}
            type='submit'
            className='bg-[#E43038] hover:bg-[#dd767b] text-white px-3 py-1 rounded text-lg focus:outline-none shadow'
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
