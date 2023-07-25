import { createSlice } from "@reduxjs/toolkit";

const INITIAL_QUERY_BUILDER_STATE = {
  operation: "",
  table: "",
  column: "",
  condition: "",
  queryName: "",
};

export const queryBuilderSlice = createSlice({
  name: "queryBuilder",
  initialState: {
    ...INITIAL_QUERY_BUILDER_STATE,
  },
  reducers: {
    setValues: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetQueryBuilder: (state) => {
      state.operation = "";
      state.table = "";
      state.column = "";
      state.condition = "";
      state.queryName = "";
    },
  },
});

// Actions
export const { setValues, resetQueryBuilder } = queryBuilderSlice.actions;

// Selectors

export const selectOperation = (state) => state.queryBuilder.operation;
export const selectTable = (state) => state.queryBuilder.table;
export const selectColumn = (state) => state.queryBuilder.column;
export const selectCondition = (state) => state.queryBuilder.condition;
export const selectQueryName = (state) => state.queryBuilder.queryName;
export const selectQueryPreview = (state) => {
  const { operation, table, column, condition } = state.queryBuilder;
  let baseQuery = `SELECT`;
  if (operation) baseQuery = baseQuery.concat(` ${operation}`);
  if (column) baseQuery = baseQuery.concat(` (${column})`);
  if (table) baseQuery = baseQuery.concat(` FROM ${table}`);
  if (condition) baseQuery = baseQuery.concat(` WHERE ${condition}`);

  return baseQuery.concat(`;`);
};
