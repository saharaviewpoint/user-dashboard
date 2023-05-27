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
    getAllMessages: build.query({
      query: () => ({
        url: "/user/messages",
        method: "GET",
      }),
    }),
    AddMessages: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/messages/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllNotifications: build.query({
      query: () => ({
        url: `/user/notifications`,
        method: "GET",
      }),
    }),
    addTaskReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/tasks/update/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getSpecificTask: build.query({
      query: (id) => ({
        url: `/user/tasks/${id}`,
        method: "GET",
      }),
    }),
    getSpecificProject: build.query({
      query: (id) => ({
        url: `/user/projects/${id}`,
        method: "GET",
      }),
    }),
    getProjectSpecificTask: build.query({
      query: (id) => ({
        url: `/user/tasks/project/${id}`,
        method: "GET",
      }),
    }),
    addStarProject: build.mutation({
      query: (id) => ({
        url: `/user/projects/star/${id}`,
        method: "POST",
      }),
    }),
    addStarTask: build.mutation({
      query: (id) => ({
        url: `/user/tasks/star/${id}`,
        method: "POST",
      }),
    }),
  }),
});

// export react hook
export const {
  useGetDetailsQuery,
  useGetProjectDetailsQuery,
  useGetAllMessagesQuery,
  useAddMessagesMutation,
  useGetProjectSpecificTaskQuery,
  useAddReportDetailsMutation,
  useGetAllNotificationsQuery,
  useAddProjectDetailsMutation,
  useGetReportsDetailsQuery,
  useGetTaskDetailsQuery,
  useGetSpecificTaskQuery,
  useGetSpecificProjectQuery,
  useAddTaskReportMutation,
  useAddStarProjectMutation,
  useAddStarTaskMutation,
} = authApi;
