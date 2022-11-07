import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Collection = ({ womenProducts }) => {
  return (
    <div className=' space-y-4 w-full flex flex-col  gap-6 '>
      <div className='flex flex-col md:flex-row h-full'>
        <div className='text-3xl md:w-1/4 flex items-center justify-center  gap-4 md:gap-24 md:flex-col md:justify-between h-full md:tracking-widest  font-semibold text-center'>
          <div className='flex  md:flex-col'>
            <h3 className='text-[#E43038]'>S</h3>
            <h3 className='text-[#752125]'>H</h3>
            <h3 className='text-[#E43038]'>O</h3>
            <h3 className='text-[#752125]'>P</h3>
          </div>
          <div className='flex md:flex-col'>
            <h3 className='text-[#E43038]'>N</h3>
            <h3 className='text-[#752125]'>O</h3>
            <h3 className='text-[#E43038]'>W</h3>
          </div>
        </div>

        <Swiper
          grabCursor={true}
          modules={[Navigation]}
          navigation={true}
          className='w-72 h-72 md:h-96 lg:w-96 lg:h-96 xl:w-full'
        >
          {womenProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Link href={`/detail/${product.id}`}>
                <Image
                  src={product.image}
                  alt=''
                  width={500}
                  height={100}
                  className=' object-contain w-full h-full'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1 className=' text-4xl md:text-5xl lg:text-6xl w-full  xl:text-7xl  tracking-widest  font-semibold text-center mt-4'>
        BIG SALE
      </h1>
      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='flex flex-col items-center justify-center w-full md:w-1/2'>
          <video
            src='/assets/video.mp4'
            autoPlay
            loop
            muted
            className='  p-4 object-contain'
          />
        </div>
        <div className='flex flex-col items-center justify-center w-full md:w-1/2'>
          <Image
            src='/assets/autumn-sale.png'
            alt='autumn sale'
            width={500}
            height={500}
            className=' p-4 w-full object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
