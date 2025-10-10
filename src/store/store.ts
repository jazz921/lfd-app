import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slices/file.slice";

export const store = configureStore({
  reducer: {
    file: fileSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch