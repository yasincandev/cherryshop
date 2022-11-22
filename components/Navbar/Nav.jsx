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
import { selectUser } from "../../store/reducers/authSlice";
import { useState } from "react";
import Search from "./Search";

const Nav = () => {
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=' flex justify-between items-center mb-5  gap-4 '>
      <Link href='/'>
        <Image
          src='/assets/logo.png'
          alt=''
          width={180}
          height={100}
          className='w-32 md:w-36 lg:w-44 rounded-full  '
        />
      </Link>
      <div className='hidden md:flex items-center'>
        <Search />
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
