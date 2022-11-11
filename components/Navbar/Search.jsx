import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, brands } from "../../data";
import { useGetProductsQuery } from "../../store/services/productApi";

//create a search component which depends on the search query with product title. Show suggestions as the user types.

const Search = () => {
  const { isLoading, data } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  useEffect(() => {
    if (search.length > 0) {
      const results = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [data, search]);

  return (
    <div className='relative'>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Search...'
        className='px-8 ml-4 w-full border rounded-lg py-2 text-gray-700 focus:outline-none items-center'
        value={search}
        onChange={handleChange}
      />
      {isLoading ? (
        <div class='w-60 h-24 border-2 rounded-md mx-auto'>
          <div class='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
            <div class='w-36 bg-gray-300 h-6 rounded-md '></div>
            <div class='w-24 bg-gray-300 h-6 rounded-md '></div>
          </div>
        </div>
      ) : (
        <div
          className={`absolute z-50 top-12 left-0 w-full bg-white rounded-lg shadow-lg ${
            showSuggestions && filteredProducts.length > 0 ? "block" : "hidden"
          }`}
        >
          {filteredProducts.map((product) => (
            <Link
              className='flex'
              href={`/products/${product.slug}`}
              key={product.id}
            >
              <p
                className='block px-4 py-2 text-gray-700 hover:bg-gray-200'
                onClick={() => {
                  setSearch("");
                  setShowSuggestions(false);
                }}
              >
                {product.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
