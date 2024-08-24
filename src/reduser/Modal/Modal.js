import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getData } from "../counter";

// Thunks

export const postDishCotegoriya = createAsyncThunk(
  "project/postDishCotegoriya",
  async (obj, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `DishCategory/Create-DishCategory`,
        obj,
        {
          "Content-Type": "application/json",
        }
      );
      dispatch(getData());
    } catch (error) {
      console.log(error);
    }
  }
);
