import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col w gap-10'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
