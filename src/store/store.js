import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reduser/counter";


export const store = configureStore({
  reducer: {
    product: counterReducer,
  },  
});
