import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

// Thunks
export const getData = createAsyncThunk(
  "project/getData",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Dish/GetDishes`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDataDrink = createAsyncThunk(
  "project/getDataDrink",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Drink/GetDrinks`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getDishIngridient = createAsyncThunk(
  "project/getDishIngridient",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(
        `DishIngredient/Get-DishIngredient`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDishesWithDrinks = createAsyncThunk(
  "project/getDishesWithDrinks",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Dish/GetDishesWithDrinks`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getDataCategoriya = createAsyncThunk(
  "project/getDataCategoriya",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(
        `Category/Get-Categories?PageSize=100`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getDishCategoriy = createAsyncThunk(
  "project/getDishCategoriy",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`DishCategory/Get-DishCategory`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUser = createAsyncThunk(
  "project/getUser",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`User/users`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBlock = createAsyncThunk(
  "project/getBlock",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Order/Get-Block-Order-Control`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCategoriyaProductById = createAsyncThunk(
  "project/getCategoriyaProductById",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Category/Get-Category-By${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getProductById = createAsyncThunk(
  "project/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Dish/Get-Dish-By${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductdrinkById = createAsyncThunk(
  "project/getProductdrinkById",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Drink/Get-Drink-By${id}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserById = createAsyncThunk(
  "project/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`User/${id}`);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getIngridient = createAsyncThunk(
  "project/getIngridient",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Ingredient/GetIngredients`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrder = createAsyncThunk(
  "project/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`OrderDetail/GetOrderDetails`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrderById = createAsyncThunk(
  "project/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(
        `OrderDetail/Get-OrderDetail-By${id}`
      );
      console.log(5);
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postCart = createAsyncThunk(
  "project/postCart",
  async (id, { rejectWithValue }) => {
    try {
      await axiosRequest.post(`Cart/add-product-to-cart?id=${id}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const deleteCart = createAsyncThunk(
  "project/deleteCart",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.delete(
        `Cart/delete-product-from-cart?id=${id}`
      );
      dispatch(getCart());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increase = createAsyncThunk(
  "project/increase",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.put(`Cart/increase-product-in-cart?id=${id}`);
      dispatch(getCart());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const orderStatus = createAsyncThunk(
  "project/orderStatus",
  async (obj, { dispatch }) => {
    console.log(obj);

    try {
      await axiosRequest.put("Order/Update-Order", obj, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getOrder());
    } catch (error) {
      console.log(error);
    }
  }
);

export const blocked = createAsyncThunk(
  "project/blocked",
  async (e, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.put(`Order/Block-Order`, e);
      
      
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fogotPassword = createAsyncThunk(
  "project/fogotPassword",
  async (email, { dispatch, rejectWithValue }) => {
    try {
     const response= await axiosRequest.put(
        "Account/forgot-password",
        { "email": email },
        {
          headers: { "Content-Type": "application/json" }, // Set headers here
        }
      );

      return response.data
    } catch (error) {
      console.log({ email: email });

      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const resetPassword = createAsyncThunk(
  "project/resetPassword",
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      await axiosRequest.put("Account/reset-password", obj);
      dispatch(getCart());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "project/getCart",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axiosRequest.get(`Cart/get-products-from-cart`);
      return data.data[0].productsInCart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    data: [],
    dataDishIngridient: [],
    dataDrink: [],
    dataCategoriya: [],
    dataCategoriyaById: [],
    dataUserById: [],
    dataIngridient: [],
    dataDishCategory: [],
    dataDishesWithDrinks: [],
    dataDishCategoriy: [],
    dataBlock: [],
    dataOrder: [],
    dataOrderById: [],
    dataUser: [],
    ById: [],

    drinkById: [],
    Cart: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.dataOrder = action.payload;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.dataOrderById = action.payload;
      })
      .addCase(getIngridient.fulfilled, (state, action) => {
        state.dataIngridient = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.dataUser = action.payload;
      })
      .addCase(getDishIngridient.fulfilled, (state, action) => {
        state.dataDishIngridient = action.payload;
      })
      .addCase(getBlock.fulfilled, (state, action) => {
        state.dataBlock = action.payload;
      })
      .addCase(getDishesWithDrinks.fulfilled, (state, action) => {
        state.dataDishesWithDrinks = action.payload;
      })

      .addCase(getDishCategoriy.fulfilled, (state, action) => {
        state.dataDishCategory = action.payload;
      })
      .addCase(getDataDrink.fulfilled, (state, action) => {
        state.dataDrink = action.payload;
      })
      .addCase(getDataCategoriya.fulfilled, (state, action) => {
        state.dataCategoriya = action.payload;
      })
      .addCase(getCategoriyaProductById.fulfilled, (state, action) => {
        state.dataCategoriyaById = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.dataUserById = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.ById = action.payload;
      })
      .addCase(getProductdrinkById.fulfilled, (state, action) => {
        state.drinkById = action.payload;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.Cart = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(getDataDrink.rejected, (state, action) => {
        console.error(action.payload);
      });
    // Add other rejected cases similarly
  },
});

export default projectSlice.reducer;
