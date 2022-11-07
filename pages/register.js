import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { auth, createUserWithEmailAndPassword } from "../firebaseConfig";
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
    <div className='w-full h-screen flex flex-col-reveresed -mt-6'>
      <Image
        src='/assets/Register.jpg'
        alt='background'
        className='object-cover h-screen w-7/12'
        width={600}
        height={600}
      />

      <div className='bg-white flex flex-col justify-center items-center w-5/12 shadow-lg'>
        <h1 className='text-3xl font-bold text-[#E43038] mb-2'>REGISTER</h1>
        <div className='w-1/2 text-center'>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            value={email}
            placeholder='email'
            autoComplete='off'
            className='shadow-md border w-full h-10 px-3 py-2 text-black focus:outline-none focus:border-[#E43038] mb-3 rounded'
          />
          <input
            type='text'
            name='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='username'
            autoComplete='off'
            className='shadow-md border w-full h-10 px-3 py-2 text-black focus:outline-none focus:border-[#E43038] mb-3 rounded'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            placeholder='password'
            autoComplete='off'
            className='shadow-md border w-full h-10 px-3 py-2 text-black focus:outline-none focus:border-[#E43038] mb-3 rounded'
          />

          <button
            onClick={registerHandler}
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

export default Register;
