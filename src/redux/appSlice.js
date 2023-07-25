import { createSlice } from "@reduxjs/toolkit";

const INITIAL_APP_STATE = {
  savedQueries: [],
  currentActiveQuery: "",
  tableData: [],
  sortState: {
    sortByKey: "",
    direction: "",
  },
};

// Slice
export const appSlice = createSlice({
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
    setSortState: (state, action) => {
      state.sortState = action.payload;
    },
  },
});

// Actions
export const {
  setActiveQuery,
  addSavedQuery,
  removeSavedQuery,
  setTableData,
  setSortState,
} = appSlice.actions;

//  Selectors
export const selectSavedQueries = (state) => state.app.savedQueries;
export const selectActiveQuery = (state) => state.app.currentActiveQuery;
export const selectTableData = (state) => {
  const { sortByKey, direction } = state.app.sortState;
  if (sortByKey && direction) {
    const tableDataToSort = [...state.app.tableData];
    return tableDataToSort.sort((a, b) => {
      let valOne = a[sortByKey];
      let valTwo = b[sortByKey];
      if (typeof valOne === "object") {
        valOne = Object.values(valOne).join(", ");
        valTwo = Object.values(valTwo).join(", ");
      }
      if (direction === "asc") {
        return valOne > valTwo ? 1 : -1;
      } else {
        return valOne < valTwo ? 1 : -1;
      }
    });
  }
  return state.app.tableData;
};
export const selectSortState = (state) => state.app.sortState;
