import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, brands } from "../data";
import Search from "./Navbar/Search";
import { AiOutlineSearch } from "react-icons/ai";

const SearchDetails = ({ products, title }) => {
  return (
    <>
      {products.length > 0 ? (
        <div className='container mx-auto px-4 flex justify-between '>
          <div className='flex flex-col max-w-xs gap-5 border'>
            <div className='flex flex-col gap-2 p-2 w-52  '>
              <p className=' font-semibold text-gray-700'>Search</p>
              <Search />
            </div>
            <div className='flex flex-col items-center border border-gray-300 '>
              <div className='flex flex-col gap-2 p-2 w-52 relative'>
                <input
                  type='text'
                  placeholder='Categories...'
                  className='border-b border-gray-300 bg-white h-10 px-5 pr-16  text-sm focus:outline-none'
                />
                <div className='absolute top-2 right-0 mt-2'>
                  <button className='text-gray-600 focus:outline-none'>
                    <AiOutlineSearch className='text-2xl text-[#E43038]' />
                  </button>
                </div>
              </div>
              <div className=' flex flex-col h-44 overflow-y-auto w-full p-2'>
                {categories.map((category) => (
                  <div key={category.id}>
                    <p className='text-gray-800 text-md font-semibold'>
                      {category.name}
                    </p>
                    {category.dropdown.map((subcategory) => (
                      <div key={subcategory.id}>
                        <p className='text-gray-700 text-sm ml-5 font-normal'>
                          {subcategory.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col w-full pl-2 '>
              <p className='text-gray-700 font-semibold'>Price</p>
              <div className='flex gap-5'>
                <input
                  type='text'
                  placeholder='Min'
                  className='border border-gray-300 bg-white h-10 w-20 p-2   text-sm focus:outline-none'
                />
                <input
                  type='text'
                  placeholder='Max'
                  className='border border-gray-300 bg-white h-10  w-20 p-2 text-sm focus:outline-none'
                />
                <AiOutlineSearch className='text-2xl text-[#E43038]' />
              </div>
            </div>
            <div className='flex flex-col items-center border-2 border-gray-300 '>
              <div className='flex flex-col gap-2 p-2 w-52 relative'>
                <input
                  type='text'
                  placeholder='Categories...'
                  className='border-b border-gray-300 bg-white h-10 px-5 pr-16  text-sm focus:outline-none'
                />
                <div className='absolute top-2 right-0 mt-2'>
                  <button className='text-gray-600 focus:outline-none'>
                    <AiOutlineSearch className='text-2xl text-[#E43038]' />
                  </button>
                </div>
              </div>
              <div className=' flex flex-col h-44 overflow-y-auto w-full p-2'>
                {brands.map((brand) => (
                  <div key={brand.id} className='flex items-center'>
                    <input type='checkbox' className='mr-2' />
                    <p className='text-black font-semibold'>{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='bg-white'>
            <h2 className='p-2 ml-5 mt-2 bg-gray-600 w-fit rounded-lg text-white'>
              Search Results for <span className='text-[#E43038]'>{title}</span>
            </h2>
            <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
              <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {products.map((item) => (
                  <div
                    key={item.id}
                    className='border-2 rounded-md flex flex-col items-center  hover:shadow-md hover:scale-105 transition-all '
                  >
                    <Link
                      href={`/detail/${item.id}`}
                      className=' relative w-full  h-full flex items-center justify-center'
                    >
                      <Image
                        src={item.image}
                        alt=''
                        width={100}
                        height={50}
                        className='w-auto h-auto object-contain   '
                      />
                    </Link>

                    <div className='flex flex-col items-center justify-center bg-slate-300 gap-2 text-center h-40 w-full p-2'>
                      <h1 className='text-md font-semibold '>{item.title}</h1>
                      <p className='text-sm '>${item.price}</p>
                    </div>

                    <Link
                      className='flex items-center justify-end w-full h-12 '
                      href={`/detail/${item.id}`}
                    >
                      <button className='bg-[#E43038] text-white w-full font-semibold text-sm px-4 py-2  hover:bg-[#752125]'>
                        Details
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-2xl font-semibold'>
            No Products Found For{" "}
            <span className='text-[#E43038] capitalize'>{title}</span>
          </h1>
        </div>
      )}
    </>
  );
};

export default SearchDetails;
