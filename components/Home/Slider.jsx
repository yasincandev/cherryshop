import Image from "next/image";

const Slider = ({ loading }) => {
  return (
    <div className='w-full mt-10'>
      {loading ? (
        <div className='animate-pulse'>
          <div className='bg-gray-400 h-64 w-full'></div>
        </div>
      ) : (
        <Image
          src='/assets/black-friday.png'
          alt='black-friday'
          width={2400}
          height={1600}
          className='w-full h-full object-contain p-4'
          priority
        />
      )}
    </div>
  );
};

export default Slider;
