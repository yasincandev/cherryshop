import { useGetProductsQuery } from "../../store/services/productApi";
import { useRouter } from "next/router";
import SearchDetails from "../../components/SearchDetails";
import Head from "next/head";

const SearchDetail = () => {
  const router = useRouter();
  const { title } = router.query;
  const { data, isSuccess } = useGetProductsQuery();

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <main className='container mx-auto mt-[72px]'>
      <Head>
        <title>Search Detail</title>
      </Head>
      {isSuccess && <SearchDetails title={title} products={filteredProducts} />}
    </main>
  );
};

export default SearchDetail;
