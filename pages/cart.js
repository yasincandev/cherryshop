import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { updateCart } from "../store/reducers/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const { user } = useSelector((state) => state.user);

  const checkoutHandler = () => {
    if (!user) {
      alert("Please login to checkout");
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
              <h2 className='font-semibold text-2xl'>{totalQuantity} Items</h2>
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
              <h3 className='font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center'>
                Total Price
              </h3>
            </div>
            {cartItems.map((item) => (
              <div
                className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'
                key={item.id}
              >
                <div className='flex w-2/5'>
                  <div className='w-20'>
                    <Image src={item.image} alt='' width={100} height={100} />
                  </div>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{item.title}</span>
                    <span className='text-red-500 text-xs'>
                      Size: {item.selectedSize}
                    </span>
                    <span className='text-red-500 text-xs'>
                      Color: {item.selectedColor}
                    </span>
                  </div>
                </div>
                <div className='flex justify-center w-1/5'>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCart({ id: item.id, quantity: item.quantity - 1 })
                      )
                    }
                    className='text-gray-600 focus:outline-none focus:text-gray-600'
                  >
                    <AiOutlineMinus />
                  </button>

                  <span className='text-gray-700 text-md mx-2'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateCart({ id: item.id, quantity: item.quantity + 1 })
                      )
                    }
                    className='text-gray-600 focus:outline-none focus:text-gray-600'
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className='flex justify-center w-1/5'>
                  <span className='text-gray-700 text-md'>${item.price}</span>
                </div>
                <div className='flex justify-center w-1/5'>
                  <span className='text-gray-700 text-md'>
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
            <Link
              href='/'
              className='flex font-semibold text-indigo-600 text-sm mt-10'
            >
              <svg
                className='fill-current mr-2 text-indigo-600 w-4'
                viewBox='0 0 448 512'
              >
                <path d='M20.485 235.636l207.03-207.03c4.686-4.686 12.284-4.686 16.971 0l22.627 22.627c4.686 4.686 4.686 12.284 0 16.971L54.627 256l178.485 178.485c4.686 4.686 4.686 12.284 0 16.971l-22.627 22.627c-4.686 4.686-12.284 4.686-16.971 0l-207.03-207.03c-4.687-4.686-4.687-12.284 0-16.97z'></path>
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div className='w-1/4 px-8 py-10 '>
            <h1 className='font-semibold text-2xl border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>
                Items {totalQuantity}
              </span>
              <span className='font-semibold text-sm'>${totalAmount}</span>
            </div>
            <div>
              <label className='font-medium inline-block mb-3 text-sm uppercase'>
                Shipping
              </label>
              <select className='block p-2 text-gray-600 w-full text-sm'>
                <option>Standard Shipping - $10.00</option>
              </select>

              <button
                onClick={checkoutHandler}
                className={`bg-indigo-500 font-semibold hover:bg-indigo-600 px-5 py-2 rounded shadow text-sm text-white uppercase w-full mt-8 ${
                  totalQuantity == 0 && "opacity-50 cursor-not-allowed"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
