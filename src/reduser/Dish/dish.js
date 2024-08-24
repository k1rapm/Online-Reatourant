
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getData, getDataCategoriya, getDishIngridient, getIngridient } from "../counter";

export const editDish = createAsyncThunk(
  "ingredients/editDish",
  async (obj, { dispatch }) => {
    console.log(obj);

    try {
      await axiosRequest.put("Dish/Update-Dish", obj, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getData());
      
    } catch (error) {
      console.log(error);
    }
  }
);
export const postDish = createAsyncThunk(
  "project/postDish",
  async(form,{ dispatch }) => {
    try {
      let { data } = await axiosRequest.post(`Dish/Create-Dish`, form ,{
        "Content-Type": "multipart/form-data",
      }); 
      dispatch(getData());
     
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteDish = createAsyncThunk(
  "project/deleteDish",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.delete(`Dish/${id}`);
      dispatch(getData());

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);