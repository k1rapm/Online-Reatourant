import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getDataCategoriya } from "../counter";

export const editCategoriya = createAsyncThunk(
  "ingredients/editCategoriya",
  async (obj, { dispatch }) => {
    console.log(obj);

    try {
      await axiosRequest.put("Category/Update-Category", obj, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getDataCategoriya());
    } catch (error) {
      console.log(error);
    }
  }
);
export const postCategoriya = createAsyncThunk(
  "project/postCategoriya",
  async (form, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(`Category/Create-Category`, form, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getDataCategoriya());
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletCotegoriya = createAsyncThunk(
  "project/deletCotegoriya",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.delete(`Category/Delete-Category-${id}`);
      dispatch(getDataCategoriya());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

