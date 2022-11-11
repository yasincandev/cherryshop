import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setMessage } from "../store/reducers/messageSlice";
import {
  loginUserThunk,
  setUser,
  selectUser,
  selectStatus,
  selectError,
} from "../store/reducers/authSlice";
import { toastr } from "react-redux-toastr";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      const user = await dispatch(loginUserThunk({ email, password }));
      if (user) {
        router.push("/");
        toastr.success("Success", "User logged in successfully");
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
            Log in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{" "}
            <Link
              href='/register'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              create an account
            </Link>
          </p>
        </div>
        <Formik
          className='mt-8 space-y-6'
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className='-space-y-px rounded-md shadow-sm'>
              <input type='hidden' name='remember' defaultValue='true' />
              <div>
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
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='password'
                  autoComplete='current-password'
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
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
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
                  {formik.isSubmitting ? "Loading..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
