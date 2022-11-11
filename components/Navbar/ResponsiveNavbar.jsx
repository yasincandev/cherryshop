import { Fragment, useEffect, useState } from "react";
import {
  Bars3Icon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../../data";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { logoutUserThunk, selectUser } from "../../store/reducers/authSlice";
import { Disclosure } from "@headlessui/react";

const ResponsiveNavbar = () => {
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector(selectUser);
  const [shadow, setShadow] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutUserThunk());
  };

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "nav") {
      setOpenNav(false);
    }
  };

  const toggleCategory = (e) => {
    setOpenDropdown(!openDropdown);
  };

  const toggleSubCategory = (category) => {
    setShowSubCategories(true);
    setSelectedCategory(category);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <Fragment>
      <div className='flex items-center justify-between px-4 py-2 bg-white shadow-md '>
        <div className='flex items-center w-full justify-between'>
          <Link href='/'>
            <Image
              src='/assets/logo.png'
              alt='logo'
              width={50}
              height={50}
              className='cursor-pointer rounded-full'
            />
          </Link>

          <div onClick={handleNav} className='md:hidden text-gray-700'>
            <Bars3Icon className='h-8 w-8' />
          </div>
        </div>
        <div
          onClick={handleOutsideClick}
          id='nav'
          className={
            openNav
              ? "md:hidden z-50 fixed left-0 top-0 w-full h-screen bg-black/70"
              : "transition-all z-50 duration-300 ease-in-out "
          }
        >
          <div
            className={
              openNav
                ? " fixed z-50 left-0 top-0 w-[85%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-6 ease-in duration-500"
                : "fixed z-50 left-[-100%] top-0 p-6 ease-in duration-500"
            }
          >
            <div>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  <Link href='/'>
                    <Image
                      src='/assets/logo.png'
                      alt='logo'
                      width={75}
                      height={50}
                      className='cursor-pointer rounded-full'
                    />
                  </Link>
                  <div className='flex items-center cursor-pointer'>
                    <Link href='/cart'>
                      <AiOutlineShoppingCart className='text-2xl text-gray-700' />
                      <span className='text-gray-700 font-semibold text-lg ml-2'>
                        {cartItems.length}
                      </span>
                    </Link>
                  </div>
                </div>
                <div
                  onClick={handleNav}
                  className='rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer'
                >
                  <XMarkIcon className='h-4 w-4 text-gray-500' />
                </div>
              </div>
              <div className=' border-gray-300 my-4'>
                <input
                  type='text'
                  placeholder='Search'
                  className=' px-8  w-full border-none rounded-lg py-2 text-gray-700 focus:outline-none items-center '
                />
              </div>
            </div>
            <div className='py-4 flex flex-col border-b'>
              <h1 className='text-xl font-semibold'>Categories</h1>
            </div>
            <div className='grid grid-cols-2 gap-4 w-full'>
              {categories.map((category) => (
                <Disclosure as='div' key={category.id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex items-center w-full py-2 text-gray-700 hover:text-[#E43038] focus:outline-none'>
                        <span className='text-sm font-semibold'>
                          {category.name}
                        </span>
                        <ChevronDownIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-gray-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='p-2 text-md font-semibold grid grid-cols-2 gap-4  text-gray-500'>
                        {category.dropdown.map((subCategory) => (
                          <Link key={subCategory.id} href='#'>
                            <p className='cursor-pointer  hover:text-[#E43038]'>
                              {subCategory.name}
                            </p>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
            <div className='flex mt-7 w-full items-center justify-between'>
              {user ? (
                <div className='flex flex-col  items-center ml-4'>
                  <div className='flex items-center'>
                    <AiOutlineUser className='text-2xl text-gray-700' />
                    <span className='text-gray-700 font-semibold text-lg ml-2'>
                      {user.displayName}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={logoutUser}
                      className='ml-4 text-gray-700 font-semibold text-lg'
                    >
                      Logout
                    </button>
                    <AiOutlineLogout className='text-2xl text-gray-700 ml-2' />
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center  w-full ml-4'>
                  <button className='flex w-full justify-center rounded-md border border-transparent bg-[#E43038] py-2 px-4 text-sm font-medium mt-4 text-white hover:bg-[#dd9194] focus:outline-none focus:ring-2 focus:ring-[#331416] focus:ring-offset-2'>
                    <Link href='/login'>Login</Link>
                  </button>
                  <button className=' flex w-full justify-center rounded-md border border-transparent bg-[#E43038] py-2 px-4 text-sm font-medium mt-4 text-white hover:bg-[#dd9194] focus:outline-none focus:ring-2 focus:ring-[#331416] focus:ring-offset-2'>
                    <Link href='/register'>Register</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResponsiveNavbar;
