import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./features/project";

const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
  },
});

export default store;
