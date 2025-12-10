import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./(Account)/reducer";
import titleReducer from "./reducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
    title: titleReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
