import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:7000/api/v1";

export const contentSlice = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (newContent) => ({
        url: "/content",
        method: "POST",
        credentials: "include",
        body: newContent,
      }),
    }),
    getContentByDate: builder.query({
      query: (date) => `/content?date=${date}`,
      credentials: "include",
    }),
    updateContent: builder.mutation({
      query: (updatedContent) => ({
        url: `/content/${updatedContent._id}`,
        method: "PUT",
        credentials: "include",
        body: updatedContent,
      }),
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/content/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    statusUpdate: builder.mutation({
      query: (id) => ({
        url: `/content/status/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    undoStatusUpdate: builder.mutation({
      query: (id) => ({
        url: `/content/status/${id}`,
        method: "POST",
        credentials: "include",
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
