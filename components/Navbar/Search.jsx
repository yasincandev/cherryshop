import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import Router from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Search = () => {
  const [title, setTitle] = useState("");

  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    setTitle(values.title);
    Router.push(`/search/${values.title}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='flex flex-col gap-2 p-2 w-52  '>
        <div className='flex flex-col gap-2 p-2 w-52 relative'>
          <Field
            type='text'
            name='title'
            placeholder='Search...'
            className='border-b border-gray-300 bg-white h-10 px-5 pr-16  text-sm focus:outline-none'
          />
          <ErrorMessage name='title' component='div' className='text-red-500' />
          <div className='absolute top-2 right-0 mt-2'>
            <button className='text-gray-600 focus:outline-none'>
              <AiOutlineSearch className='text-2xl text-[#E43038]' />
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

/*  <input
        type='text'
        name='search'
        id='search'
        placeholder='Search...'
        className='px-8 ml-4 w-full border rounded-lg py-2 text-gray-700 focus:outline-none items-center'
        value={title}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='absolute top-0 right-0 mt-2  text-gray-700 focus:outline-none'
      >
        <AiOutlineSearch className='text-2xl text-[#E43038]' />
      </button>
    </form>
  );
}; */

export default Search;
