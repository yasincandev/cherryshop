import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSelect } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { removeFromCart, increaseQuantity } from "../store/reducers/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toastr.success("Success", "Item removed from cart");
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
        <div className='flex flex-col md:flex-row shadow-md my-10'>
          <div className='w-full md:w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
              <h2 className='font-semibold text-2xl'>
                {totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}{" "}
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
              <h3 className='font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center'>
                Delete
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
                    <span className='font-semibold text-sm'>
                      {item.title.length > 30
                        ? item.title.substring(0, 20) + "..."
                        : item.title}
                    </span>
                  </div>
                </div>
                <div className='flex items-center justify-center w-1/5'>
                  <AiOutlineMinus
                    onClick={
                      //if quantity is 1 then remove item from cart
                      item.quantity === 1
                        ? () => handleRemoveFromCart(item.id)
                        : () => dispatch(removeFromCart(item.id))
                    }
                    className='cursor-pointer hover:text-[#E43038] '
                  />

                  <span className='text-gray-700 mx-2'>{item.quantity}</span>
                  <AiOutlinePlus
                    onClick={
                      //quantity ++ when click on plus icon
                      () => dispatch(increaseQuantity(item.id))
                    }
                    className='cursor-pointer hover:text-[#E43038] '
                  />
                </div>
                <span className='text-center w-1/5 font-semibold text-sm'>
                  ${item.price}
                </span>
                <BsTrash
                  onClick={() => handleRemoveFromCart(item.id)}
                  className='text-center  w-1/5  font-semibold text-2xl hover:text-[#E43038] cursor-pointer'
                />
              </div>
            ))}
          </div>
          <div id='summary' className='w-full md:w-1/4 px-8 py-10'>
            <h1 className='font-semibold text-2xl border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between flex-col mt-10 mb-5'>
              <div className='flex flex-col gap-7 mt-10 mb-5'>
                <span className='font-semibold text-sm uppercase flex justify-between'>
                  Total Items In Cart :
                  <p className='text-red-500 font-bold text-lg'>
                    {totalQuantity}
                  </p>
                </span>
                <span className='font-semibold text-sm uppercase flex justify-between'>
                  Total Price :
                  <p className='text-red-500 font-bold text-lg'>
                    $ {totalAmount}
                  </p>
                </span>
              </div>
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
