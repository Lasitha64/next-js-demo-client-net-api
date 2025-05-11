import { UserRegisterRequest } from "@/types/authTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:7007/";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserRegisterRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}register`, userData);
      console.log("Response from registerUser:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in registerUser:", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
