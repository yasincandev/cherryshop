import Head from "next/head";
import BestSeller from "../components/Home/BestSeller";
import Brands from "../components/Home/Brands";
import Loading from "../components/Loading";
import Slider from "../components/Home/Slider";
import Collection from "../components/Home/Collection";

import {
  useGetWomenProductsQuery,
  useGetLimitedProductsQuery,
} from "../store/services/productApi";

export default function Home() {
  const {
    data: bestSellers,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetLimitedProductsQuery();

  const {
    data: womenProducts,
    isLoading: womenLoading,
    isError: womenError,
    error: womenErrorData,
    isSuccess: womenSuccess,
  } = useGetWomenProductsQuery();

  return (
    <div>
      <Head>
        <title>Cherry Shop</title>
        <meta
          name='keywords'
          content='
          ecommerce,
          shopping,
          buy,
          sell,
          products,
          nextjs,
          react,
          redux,
          javascript,
          typescript,
          nodejs,
          '
        />
      </Head>
      <Brands loading={isLoading} />
      <Slider loading={isLoading} />
      {isLoading || womenLoading ? (
        <Loading />
      ) : (
        <>
          <BestSeller loading={isLoading} bestSellers={bestSellers} />
          <Collection womenProducts={womenProducts} />
        </>
      )}
    </div>
  );
}
