import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const contentSlice = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (newContent) => ({
        url: "/content",
        method: "POST",
        body: newContent,
      }),
    }),
    getContentByDate: builder.query({
      query: (date) => `/content?date=${date}`,
    }),
    updateContent: builder.mutation({
      query: ({ updatedContent, id }) => ({
        url: `/content/${id}`,
        method: "PUT",
        body: updatedContent,
      }),
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/content/${id}`,
        method: "DELETE",
      }),
    }),
    statusUpdate: builder.mutation({
      query: (id) => ({
        url: `/content/status/${id}`,
        method: "PUT",
      }),
    }),
    undoStatusUpdate: builder.mutation({
      query: (id) => ({
        url: `/content/status/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateContentMutation,
  useGetContentByDateQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useStatusUpdateMutation,
  useUndoStatusUpdateMutation,
} = contentSlice;
