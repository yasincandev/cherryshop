import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BestSeller = ({ bestSellers }) => {
  const [showDetailsHover, setShowDetailsHover] = useState(false);

  const handleShowDetailsHover = () => {
    setShowDetailsHover(true);
  };

  return (
    <div className=' mt-5 w-full'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-5 text-[#E43038]'>
          BEST SELLER
        </h1>
        <p className='text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#752125]'>
          Our Most Popular Products
        </p>
      </div>
      <div className=' py-10 px-12 '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {bestSellers.map((item) => (
            <div
              onMouseEnter={handleShowDetailsHover}
              key={item.id}
              onMouseLeave={() => setShowDetailsHover(false)}
              className='border-2 rounded-md flex flex-col items-center  hover:shadow-md hover:scale-105 transition-all '
            >
              <div className='relative w-full  h-full flex items-center justify-center'>
                <Image
                  src={item.image}
                  alt=''
                  width={100}
                  height={50}
                  className='w-auto h-auto object-contain  relative '
                />
              </div>

              {showDetailsHover && (
                <div className='absolute top-0 bg-gray-200 left-0 w-full h-full bg-opacity-50 flex items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <Link className='relative ' href={`/detail/${item.id}`}>
                      <h1 className='text-2xl font-semibold'>Details</h1>
                    </Link>
                  </div>
                </div>
              )}

              <div className='flex flex-col items-center justify-center bg-slate-300 gap-2 text-center h-40 w-full p-2'>
                <h1 className='text-md font-semibold '>{item.title}</h1>
                <p className='text-sm '>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
