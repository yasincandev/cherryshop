import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { auth, signOut } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const Nav = () => {
  const totalItemsInCart = useSelector((state) => state.cart.totalQuantity);
  const { user } = useSelector((state) => state.user);

  const [isLogged, setIsLogged] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

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
        <AiOutlineSearch className='h-6 w-6 pt-0.5 text-[#E43038]' />
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
          {isLogged ? (
            <Logout user={user} />
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
              {totalItemsInCart > 0 && (
                <span className='absolute bottom-4 left-5 bg-[#E43038] text-white rounded-full p-2 w-3 h-3 flex items-center justify-center text-xs'>
                  {totalItemsInCart}
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
