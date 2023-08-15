import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://shoppingphone.onrender.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "product",
    }),
  }),
});
export const { useGetAllProductsQuery } = productApi;
