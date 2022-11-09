import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { removeFromCart, clearCart } from "../store/reducers/cartSlice";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("cartItems", cartItems);
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toastr.success("Success", "Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toastr.success("Success", "Cart cleared");
  };

  //if user not logged in can't go to checkout page
  const handleCheckout = () => {
    if (!user) {
      toastr.error("Error", "Please login to checkout");
    } else {
      window.location.href = "/checkout";
    }
  };

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto mt-10'>
        <div className='flex shadow-md my-10'>
          <div className='w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
              <h2 className='font-semibold text-2xl'>
                {totalQuantity === 0} Items
              </h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                Product Details
              </h3>
              <h3 className='font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center'>
                Quantity
              </h3>
              <h3 className='font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center'>
                Price
              </h3>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'
              >
                <div className='flex w-2/5'>
                  <div className='w-20'>
                    <Image
                      src={item.image}
                      alt=''
                      width={100}
                      height={100}
                      className='w-32 md:w-48 lg:w-64   '
                    />
                  </div>
                  <div className='flex flex-col justify-center ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{item.title}</span>
                  </div>
                </div>
                <div className='flex justify-center w-1/5'>
                  <button className='text-gray-600 focus:outline-none font-semibold text-lg hover:text-red-500'>
                    <AiOutlineMinus />
                  </button>
                  <span className='text-gray-700 mx-2'>{item.quantity}</span>
                  <button className='text-gray-600 focus:outline-none font-semibold text-lg hover:text-red-500'>
                    <AiOutlinePlus />
                  </button>
                </div>
                <span className='text-center w-1/5 font-semibold text-sm'>
                  ${item.price}
                </span>
                <button className='font-semibold hover:text-red-500 text-gray-500 text-xs'>
                  <BsTrash
                    onClick={() => handleRemoveFromCart(item.id)}
                    className='text-2xl'
                  />
                </button>
              </div>
            ))}
          </div>
          <div id='summary' className='w-1/4 px-8 py-10'>
            <h1 className='font-semibold text-2xl border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>
                Items {totalQuantity}
              </span>
              <span className='font-semibold text-sm'>${totalAmount}</span>
            </div>
            <button
              onClick={handleCheckout}
              className='bg-red-500 text-gray-100 text-sm uppercase font-semibold  px-5 py-3 mt-6 w-full'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
