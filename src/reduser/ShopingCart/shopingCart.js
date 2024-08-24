import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getData } from "../counter";

// Thunks
export const postShopingCart = createAsyncThunk(
  "project/postShopingCart",
  async (obj, { dispatch }) => {
    try {
      const response = await axiosRequest.post(
        `Order/Create-Order`,
          obj,
          
          {
              headers: { "Content-Type": "application/json" },
            }
        );
        console.log(5);
      dispatch(getData());
      return response.data; // Return response data for further use if needed
    } catch (error) {
      console.error("Error posting shopping cart:", error);
      throw error; // Optional: Rethrow the error to be handled in the component
    }
  }
);
