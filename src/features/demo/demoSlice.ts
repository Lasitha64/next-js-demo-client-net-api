import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DemoEntity, DemoState } from "@/types/demoTypes";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7007/api/";

const initialState: DemoState = {
  entities: [],
  entity: null,
  loading: false,
  error: null,
};

export const fetchAllDemos = createAsyncThunk("demo/fetchAll", async () => {
  const response = await axios.get(`${BASE_URL}demo`);
  console.log("Response from API:", response.data);
  return response.data.results; // Based on ResponseDto
});

export const getDemoById = createAsyncThunk(
  "demo/getById",
  async (id: number) => {
    const response = await axios.get(`${BASE_URL}demo/${id}`);
    return response.data.results;
  }
);

export const addDemo = createAsyncThunk(
  "demo/add",
  async (demo: DemoEntity) => {
    const response = await axios.post(`${BASE_URL}demo`, demo);
    return response.data.results;
  }
);

export const editDemo = createAsyncThunk(
  "demo/edit",
  async (demo: DemoEntity) => {
    const response = await axios.put(`${BASE_URL}demo`, demo);
    return response.data.results;
  }
);

export const deleteDemo = createAsyncThunk(
  "demo/delete",
  async (id: number) => {
    await axios.delete(`${BASE_URL}demo/${id}`);
    return id;
  }
);

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDemos.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(getDemoById.fulfilled, (state, action) => {
        state.entity = action.payload;
        state.loading = false;
      })
      .addCase(addDemo.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(editDemo.fulfilled, (state, action) => {
        const index = state.entities.findIndex(
          (x) => x.id === action.payload.id
        );
        if (index > -1) state.entities[index] = action.payload;
      })
      .addCase(deleteDemo.fulfilled, (state, action) => {
        state.entities = state.entities.filter((x) => x.id !== action.payload);
      });
  },
});

export default demoSlice.reducer;
