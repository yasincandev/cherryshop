import Categories from "./Categories";
import Nav from "./Nav";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = () => {
  return (
    <>
      <div className='hidden md:flex border-b bg-white  justify-between w-full'>
        <div className='  container-custom flex flex-col'>
          <Nav />
          <Categories />
        </div>
      </div>
      <div className='md:hidden'>
        <ResponsiveNavbar />
      </div>
    </>
  );
};

export default Navbar;
