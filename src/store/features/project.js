import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "Project",
  initialState: {
    data: [],
    isSuccess: false,
    message: "not allowed",
    loading: false,
  },
  reducers: {},
  extraReducers: () => {},
});

export default projectSlice;
