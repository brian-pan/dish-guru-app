import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dishService from "./dishService";

const initialState = {
  dishes: [],
  dish: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//FUNCTIONS
//create new dish
export const createDish = createAsyncThunk(
  "dishes/create",
  async (dishData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dishService.createDish(dishData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all dish (private)
export const getMyDishes = createAsyncThunk(
  "dishes/getAllPrivate",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dishService.getMyDishes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get single dish (private, show detail page)
export const getMyDish = createAsyncThunk(
  "dishes/getPrivate",
  async (dishId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await dishService.getMyDish(dishId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//
export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    reset: (state) => initialState,
    // resetLoadingState: (state) => ({
    //   isLoading: false,
    //   isSuccess: false,
    //   isError: false,
    // }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createDish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyDishes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyDishes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dishes = action.payload; //important
      })
      .addCase(getMyDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyDish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dish = action.payload; //important step
      })
      .addCase(getMyDish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dishSlice.actions;
export default dishSlice.reducer;
