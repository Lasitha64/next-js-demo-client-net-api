import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import the demo slice
import demoReducer from "../features/demo/demoSlice";
import authReducer from "../features/Auth/authSlice";

const store = configureStore({
  reducer: {
    demo: demoReducer, // Add the demo slice reducer here
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for usage in functional components
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
