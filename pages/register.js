import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { register } from "../store/reducers/userSlice";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(register({ email, name, uid: user.user.uid }));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <Image
            src='/assets/logo.png'
            alt='background'
            className='mx-auto h-12 w-auto'
            width={600}
            height={600}
          />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Create an account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{" "}
            <Link
              href='/login'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={registerHandler}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email address'
                autoComplete='email'
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#E43038] mb-3 '
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                autoComplete='current-password'
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2  focus:outline-none focus:border-[#E43038] mb-3 '
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              onClick={registerHandler}
              type='submit'
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-[#E43038] py-2 px-4 text-sm font-medium text-white hover:bg-[#dd9194] focus:outline-none focus:ring-2 focus:ring-[#331416] focus:ring-offset-2'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
