import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getDataCategoriya, getDataDrink } from "../counter";

export const editDrink = createAsyncThunk(
  "ingredients/editDrink",
  async (obj, { dispatch }) => {
    console.log(obj);

    try {
      await axiosRequest.put("Drink/Update-Drink", obj, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getDataDrink());
    } catch (error) {
      console.log(error);
    }
  }
);
export const postDrink = createAsyncThunk(
  "project/postDrink",
  async (form, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(`Drink/Create-Drink`, form, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getDataDrink());
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteDrink = createAsyncThunk(
  "project/deleteDrink",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.delete(`Drink/${id}`);
      dispatch(getDataDrink());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
