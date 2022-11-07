import Image from "next/image";

const Slider = () => {
  return (
    <div className='w-full mt-10'>
      <Image
        src='/assets/black-friday.png'
        alt='black-friday'
        width={2400}
        height={1600}
        className='w-full h-full object-contain p-4'
        priority
      />
    </div>
  );
};

export default Slider;
