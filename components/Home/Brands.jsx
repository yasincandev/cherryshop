import Image from "next/image";
import { brands } from "../../data";

const Brands = ({ loading }) => {
  return (
    <div className='flex flex-wrap justify-center gap-3 items-center'>
      {brands.map((brand) => (
        <div
          className='flex flex-col items-center  gap-2 rounded-full '
          key={brand.id}
        >
          {loading ? (
            <div className='animate-pulse'>
              <div className='bg-gray-200 h-16 w-16 rounded-full'></div>
            </div>
          ) : (
            <>
              <div className='flex flex-row p-2 rounded-full gap-4 justify-center items-center'>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={75}
                  height={75}
                  className='rounded-full border border-purple-700 p-1 '
                />
              </div>
              <div className='text-center'>
                <p className='text-sm font-semibold'>{brand.name}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Brands;
