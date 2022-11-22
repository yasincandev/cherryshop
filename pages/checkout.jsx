import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { BsPaypal } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { toastr } from "react-redux-toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { addAddress } from "../store/reducers/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const shippingCompanies = [
  { id: 1, name: "DHL", price: 10 },
  { id: 2, name: "UPS", price: 15 },
  { id: 3, name: "FedEx", price: 20 },
];

const Checkout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(shippingCompanies[0]);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const [creditCard, setCreditCard] = useState(false);
  const [paypal, setPaypal] = useState(false);

  const toggleCreditCard = () => {
    setCreditCard(!creditCard);
    setPaypal(false);
  };
  const togglePaypal = () => {
    setPaypal(!paypal);
    setCreditCard(false);
  };

  const addressValue = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  const paymentValue = {
    paymentMethod: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  };

  const addressSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
  });

  const paymentSchema = Yup.object({
    cardName: Yup.string().required("Required"),
    cardNumber: Yup.string().required("Required"),
    cardExpiry: Yup.string().required("Required"),
    cardCvc: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();

  const addressSubmit = (values) => {
    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.address &&
      values.city &&
      values.state &&
      values.zip
    ) {
      dispatch(addAddress(values));
      toastr.success("Success", "Address added successfully");
      setSelectedIndex(1);
    } else {
      toastr.error("Error", "Please fill all fields");
    }
  };

  const paymentSubmit = (values) => {
    const { cardName, cardNumber, cardExpiry, cardCvc } = values;
    const paymentData = {
      cardName,
      cardNumber,
      cardExpiry,
      cardCvc,
    };
    localStorage.setItem("payment", JSON.stringify(paymentData));
    toastr.success("Success", "Payment added successfully");
    setSelectedIndex(2);
  };

  return (
    <div className='bg-gray-100'>
      <div className='  flex flex-col md:flex-row w-full p-6 gap-5 justify-between'>
        <div className='w-full sm:px-0'>
          <div className='border-4  border-gray-200 rounded-lg '>
            <Tab.Group
              as='div'
              className='border-b border-gray-200'
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <Tab.List className='flex p-1 space-x-1 bg-gray-200'>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-gray-900 rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60",
                      selected
                        ? "bg-[#E43038] text-white shadow"
                        : " hover:bg-gray-50"
                    )
                  }
                >
                  <span className='flex items-center justify-center'>
                    <span className='ml-3'>Shipping</span>
                  </span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-gray-900 rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-100 ring-white ring-opacity-60",
                      selected
                        ? "bg-[#E43038] text-white shadow"
                        : " hover:bg-gray-50"
                    )
                  }
                >
                  <span className='flex items-center justify-center'>
                    <span className='ml-3'>Payment</span>
                  </span>
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel>
                  <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
                    <div className='px-4 py-5 sm:px-6'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900'>
                        Fill in your shipping details
                      </h3>
                    </div>
                    <div class='w-full md:w-2/3 md:max-w-full mx-auto'>
                      <div className='p-6 border border-gray-300 sm:rounded-md'>
                        <Formik
                          initialValues={addressValue}
                          validationSchema={addressSchema}
                          onSubmit={addressSubmit}
                        >
                          <Form>
                            <div className='grid grid-cols-6 gap-6'>
                              <div className='col-span-6 sm:col-span-3'>
                                <label
                                  htmlFor='firstName'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  First name
                                </label>
                                <Field
                                  type='text'
                                  name='firstName'
                                  id='firstName'
                                  autoComplete='given-name'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='firstName'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6 sm:col-span-3'>
                                <label
                                  htmlFor='lastName'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  Last name
                                </label>
                                <Field
                                  type='text'
                                  name='lastName'
                                  id='lastName'
                                  autoComplete='family-name'
                                  className='mt-1 border p-1  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='lastName'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6 sm:col-span-4'>
                                <label
                                  htmlFor='email'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  Email address
                                </label>
                                <Field
                                  type='text'
                                  name='email'
                                  id='email'
                                  autoComplete='email'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='email'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6'>
                                <label
                                  htmlFor='address'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  Address
                                </label>
                                <Field
                                  type='text'
                                  name='address'
                                  id='address'
                                  autoComplete='street-address'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='address'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                                <label
                                  htmlFor='city'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  City
                                </label>
                                <Field
                                  type='text'
                                  name='city'
                                  id='city'
                                  autoComplete='city'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='city'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                                <label
                                  htmlFor='state'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  State / Province
                                </label>
                                <Field
                                  type='text'
                                  name='state'
                                  id='state'
                                  autoComplete='state'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='state'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>

                              <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                                <label
                                  htmlFor='zip'
                                  className='block text-sm font-medium text-gray-700'
                                >
                                  ZIP / Postal
                                </label>
                                <Field
                                  type='text'
                                  name='zip'
                                  id='zip'
                                  autoComplete='postal-code'
                                  className='mt-1 border p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                />
                                <ErrorMessage name='zip'>
                                  {(msg) => (
                                    <div className='text-red-500 text-sm'>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </div>
                            </div>

                            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                              <button
                                type='submit'
                                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              >
                                Save
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
                    <div className='px-4 py-5 sm:px-6'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900'>
                        Payment details
                      </h3>
                      <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                        Select your payment method
                      </p>
                    </div>
                    <Formik
                      initialValues={paymentValue}
                      validationSchema={paymentSchema}
                      onSubmit={paymentSubmit}
                    >
                      <Form>
                        <div className='border-t border-gray-200'>
                          <dl>
                            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Payment method
                              </dt>
                              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <div className='flex items-center'>
                                  <Field
                                    type='radio'
                                    name='paymentMethod'
                                    id='creditCard'
                                    value='creditCard'
                                    onClick={toggleCreditCard}
                                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                                  />
                                  <label
                                    htmlFor='creditCard'
                                    className='ml-3 block text-sm font-medium text-gray-700'
                                  >
                                    Credit Card
                                    <AiOutlineCreditCard className='inline-block ml-4 text-2xl' />
                                  </label>
                                </div>
                                <div className='flex items-center'>
                                  <Field
                                    type='radio'
                                    name='paymentMethod'
                                    id='paypal'
                                    value='paypal'
                                    onClick={togglePaypal}
                                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                                  />
                                  <label
                                    htmlFor='paypal'
                                    className='ml-3 block  font-medium text-gray-700'
                                  >
                                    Paypal
                                    <BsPaypal className='text-3xl inline-block ml-4 text-blue-700' />
                                  </label>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {creditCard && (
                          <div className='border-t border-gray-200'>
                            <dl>
                              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                <dt className='text-sm font-medium text-gray-500'>
                                  Credit card
                                </dt>
                                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                  <div>
                                    <label
                                      className='block text-sm font-medium text-gray-700'
                                      htmlFor='cardNumber'
                                    >
                                      Card number{" "}
                                      <span className='text-red-500'>*</span>
                                    </label>
                                    <Field
                                      type='text'
                                      name='cardNumber'
                                      id='cardNumber'
                                      autoComplete='cc-number'
                                      placeholder='0000 0000 0000 0000'
                                      className='text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full'
                                    />
                                    <ErrorMessage name='cardNumber'>
                                      {(msg) => (
                                        <div className='text-red-500 text-sm'>
                                          {msg}
                                        </div>
                                      )}
                                    </ErrorMessage>
                                  </div>
                                  <div className='flex space-x-4'>
                                    <div className='flex-1'>
                                      <label
                                        className='block text-sm font-medium text-gray-700'
                                        htmlFor='cardExpiry'
                                      >
                                        Expiration date{" "}
                                        <span className='text-red-500'>*</span>
                                      </label>
                                      <Field
                                        type='text'
                                        placeholder='MM/YY'
                                        name='cardName'
                                        id='cardName'
                                        autoComplete='cc-name'
                                        className='text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full'
                                      />
                                      <ErrorMessage name='cardName'>
                                        {(msg) => (
                                          <div className='text-red-500 text-sm'>
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>
                                    <div className='flex-1'>
                                      <label
                                        className='block text-sm font-medium text-gray-700'
                                        htmlFor='cardCvc'
                                      >
                                        CVC{" "}
                                        <span className='text-red-500'>*</span>
                                      </label>
                                      <Field
                                        type='text'
                                        placeholder='000'
                                        name='cardCvc'
                                        id='cardCvc'
                                        autoComplete='cc-csc'
                                        className='text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full'
                                      />
                                      <ErrorMessage name='cardCvc'>
                                        {(msg) => (
                                          <div className='text-red-500 text-sm'>
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>

                                    <div>
                                      <label
                                        className='block text-sm font-medium text-gray-700'
                                        htmlFor='cardName'
                                      >
                                        Name on card{" "}
                                        <span className='text-red-500'>*</span>
                                      </label>
                                      <Field
                                        type='text'
                                        name='cardName'
                                        id='cardName'
                                        autoComplete='cc-name'
                                        className='text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full'
                                        placeholder='John Doe'
                                      />
                                      <ErrorMessage name='cardName'>
                                        {(msg) => (
                                          <div className='text-red-500 text-sm'>
                                            {msg}
                                          </div>
                                        )}
                                      </ErrorMessage>
                                    </div>
                                  </div>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                        {paypal && (
                          <div className='border-t border-gray-200'>
                            <button className='font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2'>
                              Pay with PayPal - ${" "}
                              {selectedCompany.price + totalAmount}
                            </button>
                          </div>
                        )}
                        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                          <button
                            type='submit'
                            onClick={paymentSubmit}
                            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    </Formik>

                    <div>
                      <p className='text-sm text-center mt-5 text-gray-700 '>
                        By clicking the button, you agree to our{" "}
                        <span
                          href='#'
                          className='text-indigo-600 hover:text-indigo-700'
                        >
                          Privacy Policy
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className='bg-gray-50 px-4 py-3 sm:px-6 flex flex-col '>
          <h1 className='text-lg  font-medium text-gray-900'>
            Review Your Order
          </h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='mt-3 flex justify-center items-center gap-2 w-full p-2 border border-gray-200 rounded-md'
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className='rounded-lg w-12 h-12'
              />
              <p className='font-semibold '>
                {item.title.length > 30
                  ? item.title.substring(0, 20) + "..."
                  : item.title}
              </p>
              <p className='font-semibold '>{item.quantity}</p>
            </div>
          ))}
          <div className='flex flex-col mt-5 pt-2 border-t-4 border-gray-800'>
            <h1 className='font-semibold text-lg  uppercase'>
              Shipping Details
            </h1>
            <span className='text-md mb-4 text-gray-500'>
              Select a shipping company
            </span>
            <Listbox value={selectedCompany} onChange={setSelectedCompany}>
              <div className='relative mt-1'>
                <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                  <span className='block truncate'>{selectedCompany.name}</span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronUpDownIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {shippingCompanies.map((item, itemIdx) => (
                      <Listbox.Option
                        key={itemIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <>
                            <p
                              className={`flex justify-between truncate  ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              <span className='text-gray-900  font-medium'>
                                {item.name}
                              </span>

                              <span className='text-[#ff6600] font-medium'>
                                ${item.price}
                              </span>
                            </p>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className='flex flex-col gap-7 mt-10 mb-5'>
            <span className='font-semibold text-sm uppercase flex justify-between'>
              Total Items In Cart :
              <p className='text-red-500 font-bold text-lg'>{totalQuantity}</p>
            </span>
            <span className='font-semibold text-sm uppercase flex justify-between'>
              Total Price :
              <p className='text-red-500 font-bold text-lg'>
                $ {selectedCompany.price + totalAmount}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
