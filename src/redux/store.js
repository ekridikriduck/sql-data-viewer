import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
import { queryBuilderSlice } from "./queryBuilderSlice";

export default configureStore({
  reducer: {
    app: appSlice.reducer,
    queryBuilder: queryBuilderSlice.reducer,
  },
});
