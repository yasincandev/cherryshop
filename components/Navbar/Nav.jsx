import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import {
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  logoutUserThunk,
  selectUser,
  selectStatus,
  selectError,
  trackAuthState,
} from "../../store/reducers/authSlice";
import { useState } from "react";

const Nav = () => {
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  console.log("user", user);

  return (
    <nav className=' flex justify-between items-center mb-5  gap-4 '>
      <Link href='/'>
        <Image
          src='/assets/logo.png'
          alt=''
          width={180}
          height={100}
          className='w-32 md:w-48 lg:w-64   '
        />
      </Link>
      <div className='hidden md:flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 pt-0.5 text-[#E43038]'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={3}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <input
          className='px-8 ml-4 w-full border rounded-lg py-2 text-gray-700 focus:outline-none items-center '
          type='text'
          name='search'
          id='search'
          placeholder='Search...'
        />
      </div>
      <div className=' hidden md:flex items-center'>
        <ul className='flex items-center gap-3'>
          {user ? (
            <Logout />
          ) : (
            <>
              <li className='font-semibold cursor-pointer flex items-center text-gray-700 hover:text-[#E43038]'>
                <Link href='/login'>
                  <AiOutlineLogin
                    size={30}
                    className='inline-block mr-1 text-xl'
                  />
                  <span className='hidden text-lg md:inline-block'>Login</span>
                </Link>
              </li>
              <li className='font-semibold cursor-pointer flex items-center text-gray-700 hover:text-[#E43038]'>
                <Link href='/register'>
                  <AiOutlineUser
                    size={30}
                    className='inline-block mr-1 text-xl'
                  />
                  <span className='hidden text-lg md:inline-block'>
                    Register
                  </span>
                </Link>
              </li>
            </>
          )}

          <li className='font-semibold cursor-pointer relative flex items-center text-gray-700 hover:text-[#E43038]'>
            <Link href='/cart' className='flex items-center'>
              <AiOutlineShoppingCart
                size={30}
                className=' inline-block mr-1 text-xl '
              />
              {cartItems.items.length > 0 && (
                <span className='absolute bottom-4 left-5 bg-[#E43038] text-white rounded-full p-2 w-3 h-3 flex items-center justify-center text-xs'>
                  {cartItems.items.length}
                </span>
              )}

              <span className='hidden text-lg md:inline-block'>Cart</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
