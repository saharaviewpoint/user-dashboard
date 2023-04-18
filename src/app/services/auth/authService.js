import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://svp.hypen.blog",
    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
    getProjectDetails: build.query({
      query: () => ({
        url: "/user/projects",
        method: "GET",
      }),
    }),
    addProjectDetails: build.mutation({
      query: (data) => ({
        url: "/user/projects/new/",
        method: "POST",
        body: data,
      }),
    }),
    getTaskDetails: build.query({
      query: () => ({
        url: "/user/tasks",
        method: "GET",
      }),
    }),
    getProjectSpecificTask: build.query({
      query: (id) => ({
        url: `/user/tasks/project/${id}`,
        method: "GET",
      }),
    }),
    getReportsDetails: build.query({
      query: () => ({
        url: "/user/reports/attachments/all",
        method: "GET",
      }),
    }),
    addReportDetails: build.mutation({
      query: (data) => ({
        url: "/user/reports",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// export react hook
export const {
  useGetDetailsQuery,
  useGetProjectDetailsQuery,
  useAddProjectDetailsMutation,
  useGetReportsDetailsQuery,
  useGetTaskDetailsQuery,
  useGetProjectSpecificTaskQuery,
} = authApi;
