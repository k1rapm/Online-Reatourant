import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getIngridient } from "../counter";

export const postIngredient = createAsyncThunk(
  "project/postIngredient",
  async (form, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `Ingredient/Create-Ingredient`,
        form,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      dispatch(getIngridient());
    } catch (error) {
      console.log(error);
    }
  }
);
export const editIngredient = createAsyncThunk(
  "ingredients/editIngredient",
  async (obj, { dispatch }) => {
    console.log(obj);

    try {
      await axiosRequest.put("Ingredient/Update-Ingredient", obj, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getIngridient());
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteIngridient = createAsyncThunk(
  "project/deleteIngridient",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.delete(`Ingredient/${id}`);
      dispatch(getIngridient());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);