import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "http://localhost:7000/api/v1";
const baseUrl = import.meta.env.VITE_API_URL

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/business",
    }),
    createBusiness: builder.mutation({
      query: (newBusiness) => ({
        url: "/business",
        method: "POST",
        body: newBusiness,
      }),
    }),
  }),
});

export const { useGetBusinessesQuery, useCreateBusinessMutation } = businessApi;
