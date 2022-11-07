import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getAscProducts: builder.query({
      query: () => "/products?sort=asc",
    }),
    getDescProducts: builder.query({
      query: () => "/products?sort=desc",
    }),
    getLimitedProducts: builder.query({
      query: () => "/products?limit=8",
    }),
    getWomenProducts: builder.query({
      query: () => "/products/category/women%27s%20clothing",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetAscProductsQuery,
  useGetDescProductsQuery,
  useGetLimitedProductsQuery,
  useGetWomenProductsQuery,
} = productApi;
