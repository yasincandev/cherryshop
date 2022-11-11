import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  registerUser,
  setUser,
  selectUser,
  selectStatus,
  selectError,
} from "../store/reducers/authSlice";
import { setMessage } from "../store/reducers/messageSlice";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const { email, password, name } = values;
    try {
      const user = await dispatch(registerUser({ email, password, name }));
      if (user) {
        router.push("/");
        toastr.success("Success", "User registered successfully");
        dispatch(user.JSON.stringify());
      }
    } catch (error) {
      toastr.error("Error", error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <Image
            src='/assets/logo.png'
            alt='background'
            className='mx-auto h-36 w-auto rounded-full'
            width={600}
            height={600}
          />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Create an account
          </h2>
          <div className='mt-2 text-center text-sm text-gray-600'>
            Or{" "}
            <Link
              href='/login'
              className='font-medium text-[#E43038] hover:text-[#d49ea1]'
            >
              Log in to your account
            </Link>
          </div>
        </div>
        <Formik
          className='mt-8 space-y-6'
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className='-space-y-px rounded-md shadow-sm'>
              <div>
                <input type='hidden' name='remember' defaultValue='true' />
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your email'
                  className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#E43038] mb-3 '
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-xs text-red-500'>
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Username
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Enter your username'
                  className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#E43038] mb-3 '
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.displayName && formik.errors.displayName ? (
                  <div className='text-xs text-red-500'>
                    {formik.errors.displayName}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter your password'
                  className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2  focus:outline-none focus:border-[#E43038] mb-3 '
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-xs text-red-500'>
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-[#E43038] focus:ring-[#E43038] border-gray-300 rounded'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-[#E43038] py-2 px-4 text-sm font-medium mt-4 text-white hover:bg-[#dd9194] focus:outline-none focus:ring-2 focus:ring-[#331416] focus:ring-offset-2'
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Loading..." : "Register"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
