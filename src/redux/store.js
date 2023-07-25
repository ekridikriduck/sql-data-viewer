import { configureStore, createSlice } from "@reduxjs/toolkit";

const INITIAL_APP_STATE = {
  savedQueries: [],
  currentActiveQuery: "",
  tableData: [],
};

// Slice
const appSlice = createSlice({
  name: "app",
  initialState: {
    ...INITIAL_APP_STATE,
  },
  reducers: {
    setActiveQuery: (state, action) => {
      state.currentActiveQuery = action.payload;
    },
    addSavedQuery: (state, action) => {
      state.savedQueries.push(action.payload);
    },
    removeSavedQuery: (state, action) => {
      state.savedQueries = state.savedQueries.filter(
        (query) => query !== action.payload
      );
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

// Actions
export const { setActiveQuery, addSavedQuery, removeSavedQuery, setTableData } =
  appSlice.actions;

//  Selectors
export const selectSavedQueries = (state) => state.app.savedQueries;
export const selectActiveQuery = (state) => state.app.currentActiveQuery;
export const selectTableData = (state) => state.app.tableData;

// Store
export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
