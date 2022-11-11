import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetProductQuery } from "../../store/services/productApi";
import ProductDetails from "../../components/ProductDetails";

const ProductDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, error, isSuccess } = useGetProductQuery(id);

  return (
    <main className='container mx-auto mt-[72px]'>
      <Head>
        <title>Product Detail</title>
      </Head>
      {isSuccess && <ProductDetails product={data} />}
    </main>
  );
};

export default ProductDetail;
